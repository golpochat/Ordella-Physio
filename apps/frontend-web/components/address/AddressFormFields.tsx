"use client";

import { Input, Label } from "@/components/ui/input";
import { AddressLookupField } from "@/components/address/AddressLookupField";
import {
  normalizePostalCode,
  postalCodeLabel,
  regionLabel,
  type PostalAddress,
  type PostalAddressField,
} from "@/lib/postal-address";
import { LOCATION_COUNTRY_OPTIONS } from "@/lib/tenant-form-options";
import { cn } from "@/lib/cn";

type CountryOption = { value: string; label: string };

export type AddressFormFieldsProps = {
  value: PostalAddress;
  onChange: (value: PostalAddress) => void;
  errors?: Partial<Record<PostalAddressField, string>>;
  disabled?: boolean;
  idPrefix: string;
  layout?: "tenant-grid" | "auth-stack";
  showLine2?: boolean;
  showRegion?: boolean;
  includeCountry?: boolean;
  countryOptions?: ReadonlyArray<CountryOption>;
  countryControl?: "select" | "text";
  line1Label?: string;
  showLookup?: boolean;
  onFieldBlur?: (field: PostalAddressField, value: string) => void;
};

function fieldClass(layout: AddressFormFieldsProps["layout"]) {
  return layout === "auth-stack" ? "auth-field-stack" : "tenant-create-form-field";
}

function spanClass(layout: AddressFormFieldsProps["layout"], fullWidth = false) {
  if (layout === "auth-stack") {
    return fullWidth ? "auth-field-stack" : "auth-field-stack";
  }
  return fullWidth ? "tenant-create-form-field sm:col-span-2" : "tenant-create-form-field";
}

export function AddressFormFields({
  value,
  onChange,
  errors = {},
  disabled = false,
  idPrefix,
  layout = "tenant-grid",
  showLine2 = true,
  showRegion = false,
  includeCountry = true,
  countryOptions = LOCATION_COUNTRY_OPTIONS,
  countryControl = "select",
  line1Label = "Address line 1",
  showLookup = true,
  onFieldBlur,
}: AddressFormFieldsProps) {
  const wrapperClass = layout === "auth-stack" ? "space-y-4" : "tenant-create-form-grid";
  const countryOptionsList = countryOptions as CountryOption[];

  function updateField(field: PostalAddressField, nextValue: string) {
    onChange({ ...value, [field]: nextValue });
  }

  function handleLookupSelect(address: PostalAddress) {
    onChange({
      ...value,
      ...address,
      country: value.country || address.country,
    });
  }

  return (
    <div className={wrapperClass}>
      {showLookup ? (
        <div className={cn(layout === "tenant-grid" && "sm:col-span-2")}>
          <AddressLookupField
            id={`${idPrefix}-lookup`}
            country={value.country}
            disabled={disabled}
            onSelect={handleLookupSelect}
          />
        </div>
      ) : null}

      {includeCountry ? (
        <div className={fieldClass(layout)}>
          <Label htmlFor={`${idPrefix}-country`}>Country</Label>
          {countryControl === "select" ? (
            <select
              id={`${idPrefix}-country`}
              className={layout === "auth-stack" ? "auth-select" : "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"}
              value={value.country}
              disabled={disabled}
              aria-invalid={Boolean(errors.country)}
              onChange={(event) => updateField("country", event.target.value)}
              onBlur={(event) => onFieldBlur?.("country", event.target.value)}
            >
              {countryOptionsList.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <Input
              id={`${idPrefix}-country`}
              value={value.country}
              disabled={disabled}
              aria-invalid={Boolean(errors.country)}
              onChange={(event) => updateField("country", event.target.value)}
              onBlur={(event) => onFieldBlur?.("country", event.target.value)}
            />
          )}
          {errors.country ? <p className="form-field-error">{errors.country}</p> : null}
        </div>
      ) : null}

      <div className={spanClass(layout, true)}>
        <Label htmlFor={`${idPrefix}-line1`}>{line1Label}</Label>
        <Input
          id={`${idPrefix}-line1`}
          value={value.line1}
          disabled={disabled}
          aria-invalid={Boolean(errors.line1)}
          onChange={(event) => updateField("line1", event.target.value)}
          onBlur={(event) => onFieldBlur?.("line1", event.target.value)}
        />
        {errors.line1 ? <p className="form-field-error">{errors.line1}</p> : null}
      </div>

      {showLine2 ? (
        <div className={spanClass(layout, true)}>
          <Label htmlFor={`${idPrefix}-line2`}>Address line 2 (optional)</Label>
          <Input
            id={`${idPrefix}-line2`}
            value={value.line2}
            disabled={disabled}
            aria-invalid={Boolean(errors.line2)}
            onChange={(event) => updateField("line2", event.target.value)}
            onBlur={(event) => onFieldBlur?.("line2", event.target.value)}
          />
          {errors.line2 ? <p className="form-field-error">{errors.line2}</p> : null}
        </div>
      ) : null}

      <div className={fieldClass(layout)}>
        <Label htmlFor={`${idPrefix}-city`}>City</Label>
        <Input
          id={`${idPrefix}-city`}
          value={value.city}
          disabled={disabled}
          aria-invalid={Boolean(errors.city)}
          onChange={(event) => updateField("city", event.target.value)}
          onBlur={(event) => onFieldBlur?.("city", event.target.value)}
        />
        {errors.city ? <p className="form-field-error">{errors.city}</p> : null}
      </div>

      {showRegion ? (
        <div className={fieldClass(layout)}>
          <Label htmlFor={`${idPrefix}-region`}>{regionLabel(value.country)}</Label>
          <Input
            id={`${idPrefix}-region`}
            value={value.region}
            disabled={disabled}
            aria-invalid={Boolean(errors.region)}
            onChange={(event) => updateField("region", event.target.value)}
            onBlur={(event) => onFieldBlur?.("region", event.target.value)}
          />
          {errors.region ? <p className="form-field-error">{errors.region}</p> : null}
        </div>
      ) : null}

      <div className={fieldClass(layout)}>
        <Label htmlFor={`${idPrefix}-postal`}>{postalCodeLabel(value.country)}</Label>
        <Input
          id={`${idPrefix}-postal`}
          value={value.postalCode}
          disabled={disabled}
          aria-invalid={Boolean(errors.postalCode)}
          onChange={(event) => updateField("postalCode", event.target.value)}
          onBlur={(event) => {
            const normalized = normalizePostalCode(event.target.value, value.country);
            if (normalized !== event.target.value) {
              updateField("postalCode", normalized);
            }
            onFieldBlur?.("postalCode", normalized);
          }}
        />
        {errors.postalCode ? <p className="form-field-error">{errors.postalCode}</p> : null}
      </div>
    </div>
  );
}
