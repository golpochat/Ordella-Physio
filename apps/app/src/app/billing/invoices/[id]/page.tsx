"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { billingApi } from "@/lib/api";

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const { data: invoice, isLoading } = useQuery({
    queryKey: ["invoices", params.id],
    queryFn: () => billingApi.getInvoice(params.id),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Invoice {invoice?.invoiceNumber ?? params.id}</h1>
        <Button asChild variant="outline"><Link href="/billing">Back</Link></Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Invoice Details</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {isLoading ? "Loading..." : (
            <>
              <p>Status: {invoice?.status}</p>
              <p>Total: {invoice?.total} {invoice?.currency}</p>
              <div className="flex gap-2 pt-4">
                <Button variant="outline">Edit items</Button>
                <Button variant="outline">Issue invoice</Button>
                <Button>Mark as paid</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
