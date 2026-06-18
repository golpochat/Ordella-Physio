import { Socket } from "net";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { HttpError } from "@ordella/errors";
import { virusDetectedError, fileStorageError } from "@/utils/file-errors";

export type VirusScanResult = "OK" | "FOUND";

export type VirusScanContext = {
  tenantId: string;
  actorId: string;
  fileName: string;
  fileSize: number;
};

@Injectable()
export class VirusScanService implements OnModuleInit {
  private readonly logger = new Logger(VirusScanService.name);

  private isEnabled(): boolean {
    const raw = process.env.CLAMAV_ENABLED?.trim().toLowerCase();
    return raw === "true" || raw === "1";
  }

  private getHost(): string | undefined {
    return process.env.CLAMAV_HOST?.trim() || undefined;
  }

  private getPort(): number {
    return Number(process.env.CLAMAV_PORT ?? "3310");
  }

  private getTimeoutMs(): number {
    return Number(process.env.CLAMAV_TIMEOUT_MS ?? "30000");
  }

  private isProduction(): boolean {
    return (process.env.NODE_ENV ?? "development") === "production";
  }

  private isRequired(): boolean {
    const raw = process.env.CLAMAV_REQUIRED?.trim().toLowerCase();
    return raw === "true" || raw === "1";
  }

  async onModuleInit(): Promise<void> {
    const required = this.isRequired() || this.isProduction();

    if (!this.isEnabled()) {
      if (required) {
        throw new Error("CLAMAV_ENABLED must be true when CLAMAV_REQUIRED=true");
      }
      return;
    }

    const host = this.getHost();
    if (!host) {
      throw new Error("CLAMAV_HOST is required when CLAMAV_ENABLED=true");
    }

    await this.pingClamAv(host, this.getPort());
    this.logger.log(`ClamAV reachable at ${host}:${this.getPort()}`);
  }

  async scanBuffer(fileBuffer: Buffer, context?: VirusScanContext): Promise<VirusScanResult> {
    const required = this.isRequired() || this.isProduction();

    if (!this.isEnabled()) {
      if (required) {
        this.logScan(context, "FOUND", "ClamAV disabled but required");
        throw fileStorageError("Virus scanning is required but ClamAV is disabled.");
      }
      this.logScan(context, "OK", "ClamAV disabled");
      return "OK";
    }

    const host = this.getHost();
    if (!host) {
      this.logScan(context, "FOUND", "ClamAV host not configured");
      throw fileStorageError("Virus scanning is required but ClamAV is not configured.");
    }

    try {
      const response = await this.scanWithClamAv(host, this.getPort(), fileBuffer);

      if (response.includes("FOUND")) {
        this.logScan(context, "FOUND", response);
        throw virusDetectedError();
      }

      if (!response.includes("OK")) {
        this.logger.warn(`Unexpected ClamAV response: ${response}`);
        this.logScan(context, "FOUND", response);
        throw virusDetectedError();
      }

      this.logScan(context, "OK", response);
      return "OK";
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      const message = error instanceof Error ? error.message : "ClamAV scan failed";
      this.logScan(context, "FOUND", message);
      throw fileStorageError("Virus scanning is unavailable. Upload rejected.");
    }
  }

  async pingClamAv(host = this.getHost(), port = this.getPort()): Promise<void> {
    if (!host) {
      throw new Error("CLAMAV_HOST is not configured");
    }

    await new Promise<void>((resolve, reject) => {
      const socket = new Socket();
      socket.setTimeout(this.getTimeoutMs());

      socket.on("timeout", () => {
        socket.destroy();
        reject(new Error("ClamAV health check timed out"));
      });

      socket.on("error", reject);
      socket.on("connect", () => {
        socket.end();
        resolve();
      });

      socket.connect(port, host);
    });
  }

  private logScan(context: VirusScanContext | undefined, scanResult: VirusScanResult, detail: string) {
    const payload = {
      actorId: context?.actorId ?? "unknown",
      tenantId: context?.tenantId ?? "unknown",
      fileName: context?.fileName ?? "unknown",
      fileSize: context?.fileSize ?? 0,
      scanResult,
      timestamp: new Date().toISOString(),
      detail,
    };

    if (scanResult === "FOUND") {
      this.logger.warn(`ClamAV scan rejected upload: ${JSON.stringify(payload)}`);
      return;
    }

    this.logger.log(`ClamAV scan passed: ${JSON.stringify(payload)}`);
  }

  private scanWithClamAv(host: string, port: number, fileBuffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const socket = new Socket();
      let response = "";

      socket.setTimeout(this.getTimeoutMs());

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
