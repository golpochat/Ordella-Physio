"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WithPermission } from "@/lib/auth/withPermission";
import { TerminalCreateForm } from "@/components/terminals/TerminalCreateForm";

export default function ClinicTerminalCreatePage() {
  return (
    <WithPermission permission="terminal.manage">
      <Button asChild variant="ghost">
        <Link href="/clinic/terminals">&larr; Back to terminals</Link>
      </Button>
      <TerminalCreateForm />
    </WithPermission>
  );
}
