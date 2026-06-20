import { Injectable } from "@nestjs/common";
import { randomBytes } from "node:crypto";
import type { TerminalPairingCode } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class PairingRepository {
  constructor(private readonly database: DatabaseService) {}

  createPairingCode(terminalId: string, expiresAt: Date): Promise<TerminalPairingCode> {
    const code = randomBytes(4).toString("hex").toUpperCase();
    return this.database.terminalPairingCode.create({
      data: { terminalId, code, expiresAt },
    });
  }

  findValidCode(code: string) {
    return this.database.terminalPairingCode.findFirst({
      where: {
        code,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { terminal: true },
    });
  }

  markCodeUsed(id: string) {
    return this.database.terminalPairingCode.update({
      where: { id },
      data: { usedAt: new Date() },
    });
  }
}
