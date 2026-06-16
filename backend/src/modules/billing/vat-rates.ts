export type VatCountryCode =
  | "IE"
  | "GB"
  | "DE"
  | "FR"
  | "ES"
  | "IT"
  | "NL"
  | "BE"
  | "AT"
  | "PT"
  | "PL"
  | "SE"
  | "DK"
  | "FI"
  | "CZ"
  | "RO"
  | "HU"
  | "GR"
  | "OTHER_EU";

export type VatCountryOption = {
  code: VatCountryCode;
  label: string;
  rate: number;
};

/** VAT rates for platform subscription billing (extend as needed). */
export const VAT_RATE_TABLE: VatCountryOption[] = [
  { code: "IE", label: "Ireland", rate: 23 },
  { code: "GB", label: "United Kingdom", rate: 20 },
  { code: "DE", label: "Germany", rate: 19 },
  { code: "FR", label: "France", rate: 20 },
  { code: "ES", label: "Spain", rate: 21 },
  { code: "IT", label: "Italy", rate: 22 },
  { code: "NL", label: "Netherlands", rate: 21 },
  { code: "BE", label: "Belgium", rate: 21 },
  { code: "AT", label: "Austria", rate: 20 },
  { code: "PT", label: "Portugal", rate: 23 },
  { code: "PL", label: "Poland", rate: 23 },
  { code: "SE", label: "Sweden", rate: 25 },
  { code: "DK", label: "Denmark", rate: 25 },
  { code: "FI", label: "Finland", rate: 24 },
  { code: "CZ", label: "Czech Republic", rate: 21 },
  { code: "RO", label: "Romania", rate: 19 },
  { code: "HU", label: "Hungary", rate: 27 },
  { code: "GR", label: "Greece", rate: 24 },
  { code: "OTHER_EU", label: "Other EU country", rate: 21 },
];

const VAT_BY_CODE = new Map(VAT_RATE_TABLE.map((entry) => [entry.code, entry]));

export function getVatRateForCountry(countryCode: string): VatCountryOption {
  const normalized = countryCode.toUpperCase() as VatCountryCode;
  return VAT_BY_CODE.get(normalized) ?? VAT_BY_CODE.get("OTHER_EU")!;
}

export function calculateVatAmount(baseAmount: number, vatRatePercent: number): number {
  return Math.round(baseAmount * (vatRatePercent / 100) * 100) / 100;
}

export function calculateCheckoutTotals(baseAmount: number, countryCode: string) {
  const country = getVatRateForCountry(countryCode);
  const vatAmount = calculateVatAmount(baseAmount, country.rate);
  const totalAmount = Math.round((baseAmount + vatAmount) * 100) / 100;

  return {
    billingCountry: country.code,
    billingCountryLabel: country.label,
    vatRate: country.rate,
    vatAmount,
    totalAmount,
    baseAmount,
  };
}
