"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { paymentsApi } from "@/lib/api";

export default function PaymentsPage() {
  const { data, isLoading } = useQuery({ queryKey: ["payments"], queryFn: () => paymentsApi.list() });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payments</h1>
      <Card>
        <CardHeader><CardTitle>Payment History</CardTitle></CardHeader>
        <CardContent>
          {isLoading ? "Loading..." : (
            <ul className="space-y-2 text-sm">
              {(Array.isArray(data?.data) ? data.data : []).map((payment: { id: string; status?: string; amount?: string }) => (
                <li key={payment.id} className="flex items-center justify-between rounded-md border p-3">
                  <span>{payment.id}</span>
                  <div className="flex items-center gap-2">
                    <span>{payment.status}</span>
                    <Button size="sm" variant="outline">Refund</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
