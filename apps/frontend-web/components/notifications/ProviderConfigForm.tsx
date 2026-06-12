"use client";



import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import type {

  NotificationChannel,

  NotificationProviderName,

  ProviderConfigRecord,

} from "@/lib/notification-provider-types";



const CHANNELS: NotificationChannel[] = ["EMAIL", "SMS", "PUSH", "WHATSAPP", "VIBER"];

const PROVIDERS: NotificationProviderName[] = ["SENDGRID", "TWILIO", "FIREBASE", "VIBER", "NONE"];



type ProviderConfigFormProps = {

  initial?: ProviderConfigRecord | null;

  isSubmitting?: boolean;

  onSubmit: (values: {

    channel: NotificationChannel;

    provider: NotificationProviderName;

    credentials: Record<string, unknown>;

    priority: number;

    isActive: boolean;

  }) => void | Promise<void>;

  onCancel?: () => void;

};



export function ProviderConfigForm({

  initial,

  isSubmitting = false,

  onSubmit,

  onCancel,

}: ProviderConfigFormProps) {

  const [channel, setChannel] = useState<NotificationChannel>(initial?.channel ?? "EMAIL");

  const [provider, setProvider] = useState<NotificationProviderName>(initial?.provider ?? "SENDGRID");

  const [priority, setPriority] = useState(String(initial?.priority ?? 1));

  const [isActive, setIsActive] = useState(initial?.isActive ?? true);

  const [credentialsJson, setCredentialsJson] = useState(

    JSON.stringify(initial?.credentials ?? { apiKey: "" }, null, 2),

  );

  const [jsonError, setJsonError] = useState<string | null>(null);



  useEffect(() => {

    if (!initial) {

      return;

    }



    setChannel(initial.channel);

    setProvider(initial.provider);

    setPriority(String(initial.priority));

    setIsActive(initial.isActive);

    setCredentialsJson(JSON.stringify(initial.credentials, null, 2));

  }, [initial]);



  async function handleSubmit(event: React.FormEvent) {

    event.preventDefault();

    setJsonError(null);



    let credentials: Record<string, unknown>;

    try {

      credentials = JSON.parse(credentialsJson) as Record<string, unknown>;

    } catch {

      setJsonError("Credentials must be valid JSON.");

      return;

    }



    const parsedPriority = Number(priority);

    if (!Number.isInteger(parsedPriority) || parsedPriority < 1) {

      setJsonError("Priority must be a positive integer.");

      return;

    }



    await onSubmit({

      channel,

      provider,

      credentials,

      priority: parsedPriority,

      isActive,

    });

  }



  return (

    <form className="provider-config-form space-y-4" onSubmit={(event) => void handleSubmit(event)}>

      <div className="grid gap-4 md:grid-cols-2">

        <label className="space-y-1 text-sm">

          <span className="font-medium">Channel</span>

          <select

            className="w-full rounded-md border bg-background px-3 py-2"

            value={channel}

            onChange={(event) => setChannel(event.target.value as NotificationChannel)}

            disabled={Boolean(initial)}

          >

            {CHANNELS.map((value) => (

              <option key={value} value={value}>

                {value}

              </option>

            ))}

          </select>

        </label>



        <label className="space-y-1 text-sm">

          <span className="font-medium">Provider</span>

          <select

            className="w-full rounded-md border bg-background px-3 py-2"

            value={provider}

            onChange={(event) => setProvider(event.target.value as NotificationProviderName)}

          >

            {PROVIDERS.map((value) => (

              <option key={value} value={value}>

                {value}

              </option>

            ))}

          </select>

        </label>

      </div>



      <label className="space-y-1 text-sm">

        <span className="font-medium">Priority</span>

        <Input

          type="number"

          min={1}

          value={priority}

          onChange={(event) => setPriority(event.target.value)}

        />

      </label>



      <label className="flex items-center gap-2 text-sm">

        <input

          type="checkbox"

          checked={isActive}

          onChange={(event) => setIsActive(event.target.checked)}

        />

        <span>Active</span>

      </label>



      <label className="space-y-1 text-sm">

        <span className="font-medium">Credentials (JSON)</span>

        <textarea

          className="min-h-[160px] w-full rounded-md border bg-background px-3 py-2 font-mono text-xs"

          value={credentialsJson}

          onChange={(event) => setCredentialsJson(event.target.value)}

        />

      </label>



      {jsonError ? <p className="text-sm text-destructive">{jsonError}</p> : null}



      <div className="flex flex-wrap gap-2">

        <Button type="submit" disabled={isSubmitting}>

          {initial ? "Save changes" : "Add provider"}

        </Button>

        {onCancel ? (

          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>

            Cancel

          </Button>

        ) : null}

      </div>

    </form>

  );

}


