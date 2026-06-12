import { Socket } from "net";
import { Injectable, Logger } from "@nestjs/common";
import { virusDetectedError } from "@/utils/file-errors";

export type VirusScanResult = { clean: true };

@Injectable()
export class VirusScanService {
  private readonly logger = new Logger(VirusScanService.name);

  async scanBuffer(fileBuffer: Buffer): Promise<VirusScanResult> {
    const host = process.env.CLAMAV_HOST?.trim();
    const port = Number(process.env.CLAMAV_PORT ?? "3310");

    if (!host) {
      // TODO: Enable ClamAV scanning by setting CLAMAV_HOST (and optional CLAMAV_PORT) in deployment.
      return { clean: true };
    }

    const response = await this.scanWithClamAv(host, port, fileBuffer);
    if (response.includes("FOUND")) {
      throw virusDetectedError();
    }

    if (!response.includes("OK")) {
      this.logger.warn(`Unexpected ClamAV response: ${response}`);
      throw virusDetectedError("The uploaded file failed virus scanning.");
    }

    return { clean: true };
  }

  private scanWithClamAv(host: string, port: number, fileBuffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const socket = new Socket();
      let response = "";

      socket.setTimeout(30_000);

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
}
