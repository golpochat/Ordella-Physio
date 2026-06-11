const BRAND_ABBREVIATIONS: Record<string, string> = {
  "Super Admin": "SA",
  "Clinic Admin": "CA",
  Therapist: "T",
  Staff: "S",
  Pharmacy: "P",
  Patient: "P",
  Ordella: "OR",
  Dashboard: "DB",
};

export function getBrandAbbreviation(brandTitle: string): string {
  const known = BRAND_ABBREVIATIONS[brandTitle];
  if (known) {
    return known;
  }

  const initials = brandTitle
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return initials.slice(0, 2) || brandTitle.charAt(0).toUpperCase();
}
