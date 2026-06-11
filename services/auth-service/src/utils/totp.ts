import QRCode from "qrcode";
import speakeasy from "speakeasy";

const MFA_ISSUER = "Ordella Physio";

export type GeneratedTotpSecret = {
  secret: string;
  otpauthUrl: string;
};

export function generateSecret(userId: string, email: string): GeneratedTotpSecret {
  const generated = speakeasy.generateSecret({
    name: `Ordella (${email})`,
    issuer: MFA_ISSUER,
    length: 20,
  });

  return {
    secret: generated.base32,
    otpauthUrl: generated.otpauth_url ?? speakeasy.otpauthURL({
      secret: generated.base32,
      label: `Ordella (${email})`,
      issuer: MFA_ISSUER,
      encoding: "base32",
    }),
  };
}

export async function generateQRCode(otpauthUrl: string): Promise<string> {
  return QRCode.toDataURL(otpauthUrl);
}

export function verifyToken(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
    window: 1,
  });
}
