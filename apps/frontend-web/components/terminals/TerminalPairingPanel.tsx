"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { useGeneratePairingCode } from "@/hooks/usePosTerminal";

export function TerminalPairingPanel({ terminalId }: { terminalId: string }) {
  const pairingMutation = useGeneratePairingCode(terminalId);
  const [pairing, setPairing] = useState<{ code: string; expiresAt: string } | null>(null);

  async function handleGenerate() {
    try {
      const result = await pairingMutation.mutateAsync();
      setPairing({ code: result.code, expiresAt: result.expiresAt });
      toast.success("Pairing code generated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate pairing code");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device pairing</CardTitle>
      </CardHeader>
      <CardBody className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Generate a one-time code for the POS device to pair with this terminal registry entry.
        </p>
        <Button type="button" onClick={() => void handleGenerate()} disabled={pairingMutation.isPending}>
          Generate pairing code
        </Button>
        {pairing ? (
          <div className="rounded-lg border bg-muted/40 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Pairing code</p>
            <p className="mt-2 font-mono text-3xl font-bold tracking-widest">{pairing.code}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Expires {new Date(pairing.expiresAt).toLocaleString()}
            </p>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
