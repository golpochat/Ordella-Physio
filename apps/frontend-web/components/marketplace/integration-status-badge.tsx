import { Badge } from "@/components/ui/badge";

type IntegrationStatusBadgeProps = {
  status: string;
};

export function IntegrationStatusBadge({ status }: IntegrationStatusBadgeProps) {
  const normalized = status.toLowerCase();

  if (normalized === "connected") {
    return <Badge>Connected</Badge>;
  }

  if (normalized === "disconnected") {
    return <Badge variant="secondary">Disconnected</Badge>;
  }

  if (normalized === "error") {
    return <Badge variant="destructive">Error</Badge>;
  }

  return <Badge variant="outline">{status}</Badge>;
}
