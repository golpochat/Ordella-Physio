import { Socket } from "node:net";

import { env } from "../../config";
import { ForbiddenError } from "../../utils/api-error";
import { logSecurityEvent } from "./security-events.service";

export type VirusScanResult = { clean: true };

function virusDetectedError(message = "The uploaded file contains a virus."): ForbiddenError {
  return new ForbiddenError(message);
}

export function isClamAvEnabled(): boolean {
  return Boolean(env.CLAMAV_HOST?.trim());
}

export async function scanUploadBuffer(fileBuffer: Buffer): Promise<VirusScanResult> {
  const host = env.CLAMAV_HOST?.trim();
  const port = env.CLAMAV_PORT;

  if (!host) {
    if (env.CLAMAV_REQUIRED) {
      logSecurityEvent({
        type: "virus_scan",
        message: "Upload rejected because ClamAV is required but not configured",
      });
      throw new ForbiddenError("Virus scanning is required but unavailable");
    }

    return { clean: true };
  }

  const response = await scanWithClamAv(host, port, fileBuffer).catch((error: Error) => {
    logSecurityEvent({
      type: "virus_scan",
      message: "ClamAV scan failed",
      metadata: { error: error.message },
    });

    if (env.CLAMAV_REQUIRED) {
      throw virusDetectedError("The uploaded file failed virus scanning.");
    }

    throw error;
  });

  if (response.includes("FOUND")) {
    logSecurityEvent({
      type: "virus_scan",
      message: "Malware detected in upload",
      metadata: { response },
    });
    throw virusDetectedError();
  }

  if (!response.includes("OK")) {
    logSecurityEvent({
      type: "virus_scan",
      message: "Unexpected ClamAV response",
      metadata: { response },
    });

    if (env.CLAMAV_REQUIRED) {
      throw virusDetectedError("The uploaded file failed virus scanning.");
    }

    console.warn(`[clamav] unexpected response: ${response}`);
    return { clean: true };
  }

  return { clean: true };
}

function scanWithClamAv(host: string, port: number, fileBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const socket = new Socket();
    let response = "";

    socket.setTimeout(env.CLAMAV_TIMEOUT_MS);

    socket.on("data", (chunk) => {
      response += chunk.toString("utf8");
    });

    socket.on("timeout", () => {
      socket.destroy();
      reject(new Error("ClamAV scan timed out"));
    });

    socket.on("error", (error) => {
      reject(error);
    });

    socket.on("close", () => {
      resolve(response.trim());
    });

    socket.connect(port, host, () => {
      socket.write(Buffer.from("zINSTREAM\0"));

      const chunkSize = Buffer.alloc(4);
      let offset = 0;

      while (offset < fileBuffer.length) {
        const end = Math.min(offset + 20_480, fileBuffer.length);
        const chunk = fileBuffer.subarray(offset, end);
        chunkSize.writeUInt32BE(chunk.length, 0);
        socket.write(chunkSize);
        socket.write(chunk);
        offset = end;
      }

      chunkSize.writeUInt32BE(0, 0);
      socket.write(chunkSize);
      socket.end();
    });
  });
}
