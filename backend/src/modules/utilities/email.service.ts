import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { env } from "../../config";

type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: EmailAttachment[];
};

function createTransporter() {
  if (env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth:
        env.SMTP_USER && env.SMTP_PASS
          ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
          : undefined,
    });
  }

  return nodemailer.createTransport({ jsonTransport: true });
}

const transporter = createTransporter();

export async function sendEmail(input: SendEmailInput): Promise<{ messageId: string }> {
  const mail: Mail.Options = {
    from: env.SMTP_FROM,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
    attachments: input.attachments?.map((attachment) => ({
      filename: attachment.filename,
      content: attachment.content,
      contentType: attachment.contentType ?? "application/pdf",
    })),
  };

  const result = await transporter.sendMail(mail);
  const messageId = result.messageId ?? "unknown";

  if (!env.SMTP_HOST && env.NODE_ENV === "development") {
    console.info("[email] JSON transport — message captured:", messageId);
  }

  return { messageId };
}
