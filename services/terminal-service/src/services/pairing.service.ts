import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PairingRepository } from "@/repositories/pairing.repository";
import { TerminalRepository } from "@/repositories/terminal.repository";
import type { AuthenticatedTerminalUser } from "@/utils/terminal-helpers";
import { terminalNotFoundError, terminalTenantMismatchError } from "@/utils/terminal-errors";
import { randomBytes } from "node:crypto";

const PAIRING_TTL_MS = 15 * 60 * 1000;

@Injectable()
export class PairingService {
  constructor(
    private readonly terminalRepository: TerminalRepository,
    private readonly pairingRepository: PairingRepository,
  ) {}

  async generatePairingCode(terminalId: string, user: AuthenticatedTerminalUser) {
    const terminal = await this.requireTerminal(terminalId, user);
    const expiresAt = new Date(Date.now() + PAIRING_TTL_MS);
    const pairing = await this.pairingRepository.createPairingCode(terminal.id, expiresAt);

    return {
      code: pairing.code,
      expiresAt: pairing.expiresAt.toISOString(),
      terminalId: terminal.id,
    };
  }

  async claimPairingCode(code: string, deviceInfo?: { ipAddress?: string; macAddress?: string }) {
    const pairing = await this.pairingRepository.findValidCode(code.toUpperCase());
    if (!pairing) {
      throw new BadRequestException("Invalid or expired pairing code");
    }

    const deviceToken = randomBytes(32).toString("hex");
    await this.terminalRepository.update(pairing.terminalId, {
      deviceToken,
      lastSeenAt: new Date(),
      ...(deviceInfo?.ipAddress ? { ipAddress: deviceInfo.ipAddress } : {}),
      ...(deviceInfo?.macAddress ? { macAddress: deviceInfo.macAddress } : {}),
    });
    await this.pairingRepository.markCodeUsed(pairing.id);

    return {
      terminalId: pairing.terminalId,
      deviceToken,
      message: "Device paired successfully",
    };
  }

  async heartbeat(terminalId: string, deviceToken: string) {
    const terminal = await this.terminalRepository.findById(terminalId);
    if (!terminal || terminal.deviceToken !== deviceToken) {
      throw new ForbiddenException("Invalid device token");
    }

    await this.terminalRepository.update(terminalId, { lastSeenAt: new Date() });
    return { status: "ok", lastSeenAt: new Date().toISOString() };
  }

  private async requireTerminal(id: string, user: AuthenticatedTerminalUser) {
    const terminal = await this.terminalRepository.findById(id);
    if (!terminal) {
      throw terminalNotFoundError();
    }
    if (terminal.tenantId !== user.tenantId) {
      throw terminalTenantMismatchError();
    }
    return terminal;
  }
}
