import { Badge } from "@/components/dashboard/Badge";
import type { TerminalStatus } from "@/lib/terminal-portal-types";

export type TerminalStatusBadgeProps = {
  status: TerminalStatus;
};

export function TerminalStatusBadge({ status }: TerminalStatusBadgeProps) {
  return (
    <Badge variant={status === "ACTIVE" ? "success" : "danger"}>
      {status === "ACTIVE" ? "Active" : "Inactive"}
    </Badge>
  );
}
