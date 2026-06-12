"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { useDeliverNotification } from "@/hooks/useNotificationProviders";
import type { NotificationChannel } from "@/lib/notification-provider-types";

const CHANNELS: NotificationChannel[] = ["EMAIL", "SMS", "PUSH"];

type TestDeliveryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TestDeliveryModal({ open, onOpenChange }: TestDeliveryModalProps) {
  const deliverMutation = useDeliverNotification();
  const [channel, setChannel] = useState<NotificationChannel>("EMAIL");
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("This is a test notification from Ordella.");

  async function handleSend() {
    if (!to.trim()) {
      toast.error("Destination is required.");
      return;
    }

    try {
      const result = await deliverMutation.mutateAsync({
        channel,
        to: to.trim(),
        message,
        subject: channel === "EMAIL" ? "Test notification" : undefined,
        title: channel === "PUSH" ? "Test notification" : undefined,
      });
      toast.success(result.message ?? "Notification sent.");
      onOpenChange(false);
    } catch (error) {
      const messageText =
        error instanceof Error ? error.message : "Unable to send test notification.";
      toast.error(messageText);
    }
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="test-delivery-modal max-w-lg">
        <ModalHeader>
          <ModalTitle>Send test message</ModalTitle>
          <ModalDescription>
            Deliver a test notification using the active provider configuration for your tenant.
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-4">
          <label className="space-y-1 text-sm">
            <span className="font-medium">Channel</span>
            <select
              className="w-full rounded-md border bg-background px-3 py-2"
              value={channel}
              onChange={(event) => setChannel(event.target.value as NotificationChannel)}
            >
              {CHANNELS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-sm">
            <span className="font-medium">
              {channel === "EMAIL" ? "Email address" : channel === "SMS" ? "Phone number" : "Device token"}
            </span>
            <Input value={to} onChange={(event) => setTo(event.target.value)} />
          </label>

          <label className="space-y-1 text-sm">
            <span className="font-medium">Message</span>
            <textarea
              className="min-h-[100px] w-full rounded-md border bg-background px-3 py-2 text-sm"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>
        </div>

        <ModalFooter className="gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={() => void handleSend()} disabled={deliverMutation.isPending}>
            {deliverMutation.isPending ? "Sending…" : "Send test"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
