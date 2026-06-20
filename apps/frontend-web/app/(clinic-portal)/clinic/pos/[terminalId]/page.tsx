"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PosCheckout } from "@/components/pos/PosCheckout";
import { WithPermission } from "@/lib/auth/withPermission";

type PosTerminalPageProps = {
  params: { terminalId: string };
};

export default function PosTerminalPage({ params }: PosTerminalPageProps) {
  return (
    <WithPermission permission="terminal.manage">
      <PageHeader
        title="POS checkout"
        subtitle="Process walk-in sales on this terminal."
        action={
          <Button asChild variant="ghost">
            <Link href="/clinic/terminals">&larr; Terminals</Link>
          </Button>
        }
      />
      <PosCheckout terminalId={params.terminalId} />
    </WithPermission>
  );
}
