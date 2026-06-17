import { X509Certificate } from "crypto";
import { XMLParser } from "fast-xml-parser";
import { BadRequestException } from "@nestjs/common";

export type SamlMetadataValidationInput = {
  metadataXml: string;
  expectedEntityId?: string;
  expectedAcsUrl?: string;
  allowSelfSignedCerts?: boolean;
};

export type SamlMetadataValidationResult = {
  entityId: string | null;
  acsUrl: string | null;
  certificate: string | null;
  logoutUrl: string | null;
};

function normalizePem(certificate: string): string {
  const trimmed = certificate.trim();
  if (trimmed.includes("BEGIN CERTIFICATE")) {
    return trimmed;
  }

  const body = trimmed.replace(/\s+/g, "");
  const chunks = body.match(/.{1,64}/g) ?? [body];
  return `-----BEGIN CERTIFICATE-----\n${chunks.join("\n")}\n-----END CERTIFICATE-----`;
}

export function validateX509Certificate(
  certificatePem: string,
  options: { allowSelfSigned?: boolean } = {},
): void {
  const pem = normalizePem(certificatePem);
  let cert: X509Certificate;

  try {
    cert = new X509Certificate(pem);
  } catch {
    throw new BadRequestException("Certificate is not valid X.509.");
  }

  const validTo = new Date(cert.validTo);
  if (Number.isNaN(validTo.getTime()) || validTo.getTime() < Date.now()) {
    throw new BadRequestException("Certificate is expired.");
  }

  const certText = cert.toString().toLowerCase();
  if (certText.includes("sha1") || certText.includes("md5")) {
    throw new BadRequestException("Certificate signature algorithm must be SHA-256 or stronger.");
  }

  const isSelfSigned = cert.subject === cert.issuer;
  if (isSelfSigned && !options.allowSelfSigned) {
    throw new BadRequestException("Self-signed certificates are not allowed.");
  }
}

function readFirstString(value: unknown): string | null {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      const resolved = readFirstString(entry);
      if (resolved) {
        return resolved;
      }
    }
    return null;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record["#text"] === "string") {
      return record["#text"];
    }
    if (typeof record.Location === "string") {
      return record.Location;
    }
    if (record.Location && typeof record.Location === "object") {
      const location = record.Location as Record<string, unknown>;
      if (typeof location["#text"] === "string") {
        return location["#text"];
      }
    }
  }

  return null;
}

export function parseAndValidateSamlMetadata(
  input: SamlMetadataValidationInput,
): SamlMetadataValidationResult {
  if (!input.metadataXml.trim()) {
    throw new BadRequestException("Metadata document is empty.");
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    removeNSPrefix: true,
  });

  let parsed: unknown;
  try {
    parsed = parser.parse(input.metadataXml);
  } catch {
    throw new BadRequestException("Metadata XML is malformed.");
  }

  const root = parsed as Record<string, unknown>;
  const descriptor =
    (root.EntityDescriptor as Record<string, unknown> | undefined) ??
    (root.EntitiesDescriptor as Record<string, unknown> | undefined);

  if (!descriptor) {
    throw new BadRequestException("Metadata is missing EntityDescriptor.");
  }

  const entityId =
    readFirstString(descriptor.entityID) ??
    readFirstString((descriptor as Record<string, unknown>).EntityDescriptor);

  const idpDescriptor = descriptor.IDPSSODescriptor as Record<string, unknown> | undefined;
  if (!idpDescriptor) {
    throw new BadRequestException("Metadata is missing IDPSSODescriptor.");
  }

  const acsServices = idpDescriptor.SingleSignOnService;
  const acsUrl = readFirstString(acsServices);

  const keyDescriptor = idpDescriptor.KeyDescriptor as Record<string, unknown> | Array<unknown>;
  const keyDescriptors = Array.isArray(keyDescriptor) ? keyDescriptor : keyDescriptor ? [keyDescriptor] : [];
  let certificate: string | null = null;

  for (const key of keyDescriptors) {
    const keyRecord = key as Record<string, unknown>;
    const use = typeof keyRecord.use === "string" ? keyRecord.use.toLowerCase() : "";
    if (use && use !== "signing") {
      continue;
    }

    const x509 =
      (keyRecord.KeyInfo as Record<string, unknown> | undefined)?.X509Data as
        | Record<string, unknown>
        | undefined;
    const certValue = readFirstString(x509?.X509Certificate);
    if (certValue) {
      certificate = normalizePem(certValue);
      break;
    }
  }

  const logoutUrl = readFirstString(idpDescriptor.SingleLogoutService);

  if (input.expectedEntityId && entityId && entityId !== input.expectedEntityId) {
    throw new BadRequestException("Metadata EntityID does not match expected value.");
  }

  if (input.expectedAcsUrl && acsUrl && acsUrl !== input.expectedAcsUrl) {
    throw new BadRequestException("Metadata ACS URL does not match expected value.");
  }

  if (!certificate) {
    throw new BadRequestException("Metadata does not include a signing certificate.");
  }

  validateX509Certificate(certificate, {
    allowSelfSigned: input.allowSelfSignedCerts ?? false,
  });

  return {
    entityId,
    acsUrl,
    certificate,
    logoutUrl,
  };
}

export async function fetchSamlMetadata(metadataUrl: string): Promise<string> {
  const response = await fetch(metadataUrl, {
    method: "GET",
    headers: { accept: "application/xml,text/xml,*/*" },
  });

  if (!response.ok) {
    throw new BadRequestException(`Unable to fetch metadata from ${metadataUrl}.`);
  }

  return response.text();
}
