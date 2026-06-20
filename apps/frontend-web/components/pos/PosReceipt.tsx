"use client";

import type { PosSession } from "@/lib/terminal-api";
import { posSessionSubtotal } from "@/hooks/usePosTerminal";

export function PosReceipt({ session }: { session: PosSession }) {
  const subtotal = posSessionSubtotal(session);

  return (
    <div className="mx-auto max-w-sm rounded-lg border bg-white p-6 font-mono text-sm text-black print:border-none print:shadow-none">
      <p className="text-center font-bold">Ordella POS Receipt</p>
      <p className="text-center text-xs">Session {session.id.slice(0, 8)}</p>
      <hr className="my-3 border-dashed" />
      {session.items.map((item) => (
        <div key={item.id} className="flex justify-between gap-2 py-1">
          <span>
            {item.description} x{item.quantity}
          </span>
          <span>${((item.quantity * item.unitPrice) / 100).toFixed(2)}</span>
        </div>
      ))}
      <hr className="my-3 border-dashed" />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>${(subtotal / 100).toFixed(2)}</span>
      </div>
      <p className="mt-4 text-center text-xs">Thank you</p>
      <button
        type="button"
        className="mt-4 w-full rounded border px-3 py-2 text-xs print:hidden"
        onClick={() => window.print()}
      >
        Print receipt
      </button>
    </div>
  );
}
