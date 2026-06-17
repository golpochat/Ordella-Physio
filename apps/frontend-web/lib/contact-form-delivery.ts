export type ContactFormPayload = {
  name: string;
  email: string;
  clinicName: string;
  message: string;
};

export async function deliverContactSubmission(payload: ContactFormPayload): Promise<void> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "marketing_contact",
      submittedAt: new Date().toISOString(),
      ...payload,
    }),
  });

  if (!response.ok) {
    throw new Error(`Contact webhook failed (${response.status}).`);
  }
}
