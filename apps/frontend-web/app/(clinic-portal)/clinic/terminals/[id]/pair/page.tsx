"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TerminalPairingPanel } from "@/components/terminals/TerminalPairingPanel";
import { WithPermission } from "@/lib/auth/withPermission";

type TerminalPairPageProps = {
  params: { id: string };
};

export default function TerminalPairPage({ params }: TerminalPairPageProps) {
  return (
    <WithPermission permission="terminal.manage">
      <PageHeader
        title="Pair POS device"
        subtitle="Generate a pairing code for this terminal."
        action={
          <Button asChild variant="ghost">
            <Link href={`/clinic/terminals/${params.id}`}>&larr; Back</Link>
          </Button>
        }
      />
      <TerminalPairingPanel terminalId={params.id} />
    </WithPermission>
  );
}
