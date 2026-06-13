"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RateLimitRecord } from "@/lib/gateway-types";

export type RateLimitConfigProps = {
  limits: RateLimitRecord[];
  isSaving?: boolean;
  onSave: (payload: {
    name: string;
    requestsPerMinute: number;
    requestsPerHour: number;
    requestsPerDay: number;
    tokensPerMinute: number;
    tokensPerDay: number;
    burstLimit: number;
  }) => void;
};

export function RateLimitConfig({ limits, isSaving, onSave }: RateLimitConfigProps) {
  const tenantDefault = limits.find((limit) => limit.tenantId) ?? limits[0];
  const [requestsPerMinute, setRequestsPerMinute] = useState(String(tenantDefault?.requestsPerMinute ?? 60));
  const [requestsPerHour, setRequestsPerHour] = useState(String(tenantDefault?.requestsPerHour ?? 1000));
  const [requestsPerDay, setRequestsPerDay] = useState(String(tenantDefault?.requestsPerDay ?? 10000));
  const [tokensPerMinute, setTokensPerMinute] = useState(String(tenantDefault?.tokensPerMinute ?? 100000));
  const [tokensPerDay, setTokensPerDay] = useState(String(tenantDefault?.tokensPerDay ?? 1000000));
  const [burstLimit, setBurstLimit] = useState(String(tenantDefault?.burstLimit ?? 20));

  return (
    <div className="ai-gateway-limits-form">
      <h3>Rate limits</h3>
      <div className="form-grid">
        <div>
          <label className="automation-form-section-title" htmlFor="rpm">Requests / minute</label>
          <Input id="rpm" type="number" value={requestsPerMinute} onChange={(e) => setRequestsPerMinute(e.target.value)} />
        </div>
        <div>
          <label className="automation-form-section-title" htmlFor="rph">Requests / hour</label>
          <Input id="rph" type="number" value={requestsPerHour} onChange={(e) => setRequestsPerHour(e.target.value)} />
        </div>
        <div>
          <label className="automation-form-section-title" htmlFor="rpd">Requests / day</label>
          <Input id="rpd" type="number" value={requestsPerDay} onChange={(e) => setRequestsPerDay(e.target.value)} />
        </div>
        <div>
          <label className="automation-form-section-title" htmlFor="tpm">Tokens / minute</label>
          <Input id="tpm" type="number" value={tokensPerMinute} onChange={(e) => setTokensPerMinute(e.target.value)} />
        </div>
        <div>
          <label className="automation-form-section-title" htmlFor="tpd">Tokens / day</label>
          <Input id="tpd" type="number" value={tokensPerDay} onChange={(e) => setTokensPerDay(e.target.value)} />
        </div>
        <div>
          <label className="automation-form-section-title" htmlFor="burst">Burst limit</label>
          <Input id="burst" type="number" value={burstLimit} onChange={(e) => setBurstLimit(e.target.value)} />
        </div>
      </div>
      <Button
        type="button"
        disabled={isSaving}
        onClick={() =>
          onSave({
            name: "tenant-default",
            requestsPerMinute: Number(requestsPerMinute),
            requestsPerHour: Number(requestsPerHour),
            requestsPerDay: Number(requestsPerDay),
            tokensPerMinute: Number(tokensPerMinute),
            tokensPerDay: Number(tokensPerDay),
            burstLimit: Number(burstLimit),
          })
        }
      >
        Save rate limits
      </Button>
    </div>
  );
}
