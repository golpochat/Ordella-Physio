export class AddressLookupError extends Error {
  readonly code: number | string;

  constructor(code: number | string, message: string) {
    super(message);
    this.name = "AddressLookupError";
    this.code = code;
  }
}

export function messageForPostcoderError(code: number | string, fallback?: string): string {
  switch (Number(code)) {
    case 9001:
      return "Eircode lookup is not enabled on your Postcoder account. Enable Eircode under Features in the Postcoder dashboard, or search by street name instead.";
    default:
      return fallback ?? "Address lookup is temporarily unavailable. Enter your address manually.";
  }
}
