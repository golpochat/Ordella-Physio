import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const PLACEHOLDER_MESSAGES = [
  {
    id: "1",
    sender: "Front desk",
    content: "Patient arrived early for the 10:00 AM session.",
    time: "Today",
  },
  {
    id: "2",
    sender: "You",
    content: "Thanks — I will begin the assessment shortly.",
    time: "Today",
  },
];

export function TherapistMessagingPlaceholder() {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="flex min-h-[420px] flex-col">
        <CardHeader>
          <CardTitle>Secure messaging</CardTitle>
          <CardDescription>Placeholder inbox for clinic and patient communication.</CardDescription>
        </CardHeader>
        <CardBody className="flex flex-1 flex-col gap-4">
          <div className="flex-1 space-y-3 overflow-y-auto">
            {PLACEHOLDER_MESSAGES.map((message) => (
              <div key={message.id} className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{message.sender}</p>
                  <p className="text-xs text-muted-foreground">{message.time}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{message.content}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Type a message..." disabled />
            <Button disabled>Send</Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick contacts</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3 text-sm text-muted-foreground">
          <p>Clinic admin</p>
          <p>Front desk</p>
          <p>Billing team</p>
        </CardBody>
      </Card>
    </div>
  );
}
