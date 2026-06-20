"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { PosReceipt } from "@/components/pos/PosReceipt";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  posSessionSubtotal,
  readPosOfflineCache,
  useAddPosItem,
  useClosePosSession,
  useCreatePosPayment,
  useOpenPosSession,
  usePosSession,
} from "@/hooks/usePosTerminal";

export function PosCheckout({ terminalId }: { terminalId: string }) {
  const offlineCache = readPosOfflineCache(terminalId);
  const [sessionId, setSessionId] = useState(offlineCache?.sessionId ?? "");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [closingCash, setClosingCash] = useState("0");
  const [receiptSessionId, setReceiptSessionId] = useState<string | null>(null);

  const openSession = useOpenPosSession(terminalId);
  const sessionQuery = usePosSession(sessionId);
  const addItem = useAddPosItem(sessionId, terminalId);
  const createPayment = useCreatePosPayment(sessionId);
  const closeSession = useClosePosSession(sessionId);

  useEffect(() => {
    if (!sessionId && !openSession.isPending && !openSession.isSuccess) {
      void openSession.mutateAsync(0).then((session) => setSessionId(session.id));
    }
  }, [openSession, sessionId]);

  if (!sessionId || sessionQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  if (sessionQuery.isError || !sessionQuery.data) {
    return <PageError onRetry={() => void sessionQuery.refetch()} />;
  }

  const session = sessionQuery.data;
  const subtotal = posSessionSubtotal(session);

  async function handleAddItem() {
    const priceCents = Math.round(Number(unitPrice) * 100);
    const qty = Number(quantity);
    if (!description.trim() || !Number.isFinite(priceCents) || priceCents <= 0 || qty <= 0) {
      toast.error("Enter a valid item, price, and quantity");
      return;
    }

    try {
      await addItem.mutateAsync({ description: description.trim(), quantity: qty, unitPrice: priceCents });
      setDescription("");
      setUnitPrice("");
      setQuantity("1");
      toast.success("Item added");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add item");
    }
  }

  async function handlePay() {
    try {
      await createPayment.mutateAsync();
      toast.success("Payment intent created");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Payment failed");
    }
  }

  async function handleClose() {
    try {
      const closed = await closeSession.mutateAsync(Math.round(Number(closingCash) * 100));
      setReceiptSessionId(closed.id);
      toast.success("Session closed");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to close session");
    }
  }

  if (receiptSessionId && session.status === "CLOSED") {
    return <PosReceipt session={session} />;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Cart</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3">
          {session.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No items yet. Add products below.</p>
          ) : (
            session.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.description} x{item.quantity}
                </span>
                <span>${((item.quantity * item.unitPrice) / 100).toFixed(2)}</span>
              </div>
            ))
          )}
          <p className="border-t pt-3 font-medium">Subtotal: ${(subtotal / 100).toFixed(2)}</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add item</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="unitPrice">Price ($)</Label>
              <Input id="unitPrice" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Qty</Label>
              <Input id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
          </div>
          <Button type="button" className="w-full btn-primary" onClick={() => void handleAddItem()}>
            Add to cart
          </Button>
          <Button type="button" variant="secondary" className="w-full" onClick={() => void handlePay()}>
            Create payment
          </Button>
          <div className="space-y-2 border-t pt-3">
            <Label htmlFor="closingCash">Closing cash ($)</Label>
            <Input id="closingCash" value={closingCash} onChange={(e) => setClosingCash(e.target.value)} />
            <Button type="button" variant="outline" className="w-full" onClick={() => void handleClose()}>
              Close session
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
