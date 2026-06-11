import type { Terminal } from "@/generated/prisma";

/** Terminals seen within this window are considered in active use. */
export const TERMINAL_ACTIVE_SESSION_MS = 15 * 60 * 1000;

export function isTerminalInActiveUse(terminal: Pick<Terminal, "lastSeenAt">): boolean {
  if (!terminal.lastSeenAt) {
    return false;
  }

  const elapsed = Date.now() - terminal.lastSeenAt.getTime();
  return elapsed >= 0 && elapsed <= TERMINAL_ACTIVE_SESSION_MS;
}
