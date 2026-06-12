import { createHmac, timingSafeEqual } from "crypto";
import { fileStorageConfig } from "@ordella/config";
import { invalidSignedUrlError } from "@/utils/file-errors";

export type SignedAccessPayload = {
  fileId: string;
  storageKey: string;
  exp: number;
};

type SignedTokenBody = {
  fileId: string;
  storageKey: string;
  exp: number;
};

function getSigningSecret(): string {
  return fileStorageConfig.jwtSecret;
}

function signPayload(payload: string): string {
  return createHmac("sha256", getSigningSecret()).update(payload).digest("hex");
}

export function createSignedAccessToken(
  fileId: string,
  storageKey: string,
  expiresAtEpochSeconds: number,
): string {
  const body: SignedTokenBody = { fileId, storageKey, exp: expiresAtEpochSeconds };
  const payload = JSON.stringify(body);
  const signature = signPayload(payload);
  return Buffer.from(JSON.stringify({ payload, signature })).toString("base64url");
}

export function verifySignedAccessToken(token: string): SignedAccessPayload {
  let envelope: { payload?: string; signature?: string };

  try {
    envelope = JSON.parse(Buffer.from(token, "base64url").toString("utf8")) as {
      payload?: string;
      signature?: string;
    };
  } catch {
    throw invalidSignedUrlError();
  }

  if (!envelope.payload || !envelope.signature) {
    throw invalidSignedUrlError();
  }

  const expected = signPayload(envelope.payload);
  const provided = Buffer.from(envelope.signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    provided.length !== expectedBuffer.length ||
    !timingSafeEqual(provided, expectedBuffer)
  ) {
    throw invalidSignedUrlError();
  }

  let body: SignedTokenBody;
  try {
    body = JSON.parse(envelope.payload) as SignedTokenBody;
  } catch {
    throw invalidSignedUrlError();
  }

  if (!body.fileId || !body.storageKey || !Number.isInteger(body.exp) || body.exp <= 0) {
    throw invalidSignedUrlError();
  }

  if (body.exp < Math.floor(Date.now() / 1000)) {
    throw invalidSignedUrlError("The file access link has expired.");
  }

  return body;
}
