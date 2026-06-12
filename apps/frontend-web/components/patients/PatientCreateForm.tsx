"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useCreateClinicPatient } from "@/hooks/useClinicPortal";
import { parsePatientCreateErrors } from "@/lib/clinic-patient-api-errors";
import type { ClinicPatientGender } from "@/lib/clinic-portal-types";

const PATIENT_GENDER_OPTIONS: Array<{ value: ClinicPatientGender; label: string }> = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

export function PatientCreateForm() {
  const router = useRouter();
  const createPatient = useCreateClinicPatient();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<ClinicPatientGender>("MALE");
  const [bloodGroup, setBloodGroup] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [providerName, setProviderName] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [insuranceNotes, setInsuranceNotes] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!phone.trim()) {
      errors.phone = "Phone is required";
    }

    if (!dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of birth is required";
    }

    if (!addressLine1.trim()) {
      errors.addressLine1 = "Address line 1 is required";
    }

    if (!city.trim()) {
      errors.city = "City is required";
    }

    if (!state.trim()) {
      errors.state = "State is required";
    }

    if (!postalCode.trim()) {
      errors.postalCode = "Postal code is required";
    }

    if (!country.trim()) {
      errors.country = "Country is required";
    }

    if (!emergencyContactName.trim() || !emergencyContactPhone.trim()) {
      errors.emergencyContactName = "Emergency contact is required";
    }

    if (includeInsurance) {
      if (!providerName.trim()) {
        errors["insurance.providerName"] = "Insurance provider is required";
      }
      if (!policyNumber.trim()) {
        errors["insurance.policyNumber"] = "Policy number is required";
      }
      if (!expiryDate.trim()) {
        errors["insurance.expiryDate"] = "Expiry date is required";
      }
    }

    return errors;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register patient</CardTitle>
        <CardDescription>
          Add a new patient with demographics, contact details, and optional insurance.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="tenant-create-form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            setGeneralError(null);

            const clientErrors = validateClient();
            if (Object.keys(clientErrors).length > 0) {
              setFieldErrors(clientErrors);
              return;
            }

            setFieldErrors({});

            createPatient.mutate(
              {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                phone: phone.trim(),
                email: email.trim() || undefined,
                dateOfBirth: dateOfBirth.trim(),
                gender,
                bloodGroup: bloodGroup.trim() || undefined,
                addressLine1: addressLine1.trim(),
                addressLine2: addressLine2.trim() || undefined,
                city: city.trim(),
                state: state.trim(),
                postalCode: postalCode.trim(),
                country: country.trim(),
                emergencyContactName: emergencyContactName.trim(),
                emergencyContactPhone: emergencyContactPhone.trim(),
                insurance: includeInsurance
                  ? {
                      providerName: providerName.trim(),
                      policyNumber: policyNumber.trim(),
                      expiryDate: expiryDate.trim(),
                      notes: insuranceNotes.trim() || undefined,
                    }
                  : undefined,
              },
              {
                onSuccess: (response) => {
                  toast.success(response.message ?? "Patient created successfully.");
                  router.push("/clinic/patients");
                },
                onError: (error) => {
                  const parsed = parsePatientCreateErrors(error);
                  if (parsed.forbidden) {
                    router.replace("/forbidden");
                    return;
                  }
                  setFieldErrors(parsed.fieldErrors);
                  setGeneralError(parsed.generalError);
                },
              },
            );
          }}
        >
          {generalError ? <p className="tenant-create-form-error">{generalError}</p> : null}

          <fieldset className="tenant-create-form-section">
            <legend className="tenant-create-form-section-title">Personal info</legend>
            <div className="tenant-create-form-grid">
              <div className="tenant-create-form-field">
                <Label htmlFor="patient-first-name">First name</Label>
                <Input
                  id="patient-first-name"
                  value={firstName}
                  disabled={createPatient.isPending}
                  aria-invalid={Boolean(fieldErrors.firstName)}
                  onChange={(event) => setFirstName(event.target.value)}
                />
                {fieldErrors.firstName ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.firstName}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="patient-last-name">Last name</Label>
                <Input
                  id="patient-last-name"
                  value={lastName}
                  disabled={createPatient.isPending}
                  aria-invalid={Boolean(fieldErrors.lastName)}
                  onChange={(event) => setLastName(event.target.value)}
                />
                {fieldErrors.lastName ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.lastName}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="patient-dob">Date of birth</Label>
                <Input
                  id="patient-dob"
                  type="date"
                  value={dateOfBirth}
                  disabled={createPatient.isPending}
                  aria-invalid={Boolean(fieldErrors.dateOfBirth)}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                />
                {fieldErrors.dateOfBirth ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.dateOfBirth}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="patient-gender">Gender</Label>
                <select
                  id="patient-gender"
                  className="tenant-create-form-select"
                  value={gender}
                  disabled={createPatient.isPending}
                  aria-invalid={Boolean(fieldErrors.gender)}
                  onChange={(event) => setGender(event.target.value as ClinicPatientGender)}
                >
                  {PATIENT_GENDER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {fieldErrors.gender ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.gender}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="patient-blood-group">Blood group (optional)</Label>
                <Input
                  id="patient-blood-group"
                  value={bloodGroup}
                  disabled={createPatient.isPending}
                  onChange={(event) => setBloodGroup(event.target.value)}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="tenant-create-form-section">
            <legend className="tenant-create-form-section-title">Contact info</legend>
            <div className="tenant-create-form-grid">
              <div className="tenant-create-form-field">
                <Label htmlFor="patient-phone">Phone</Label>
                <Input
                  id="patient-phone"
                  value={phone}
                  disabled={createPatient.isPending}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  onChange={(event) => setPhone(event.target.value)}
                />
                {fieldErrors.phone ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.phone}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="patient-email">Email (optional)</Label>
                <Input
                  id="patient-email"
                  type="email"
                  value={email}
                  disabled={createPatient.isPending}
                  aria-invalid={Boolean(fieldErrors.email)}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {fieldErrors.email ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.email}</p>
                ) : null}
              </div>
            </div>
          </fieldset>

          <fieldset className="tenant-create-form-section">
            <legend className="tenant-create-form-section-title">Address</legend>
            <div className="tenant-create-form-grid">
              <div className="tenant-create-form-field sm:col-span-2">
                <Label htmlFor="patient-address-line-1">Address line 1</Label>
                <Input
                  id="patient-address-line-1"
                  value={addressLine1}
                  disabled={createPatient.isPending}
                  aria-invalid={Boolean(fieldErrors.addressLine1)}
                  onChange={(event) => setAddressLine1(event.target.value)}
                />
                {fieldErrors.addressLine1 ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.addressLine1}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field sm:col-span-2">
                <Label htmlFor="patient-address-line-2">Address line 2 (optional)</Label>
                <Input
                  id="patient-address-line-2"
                  value={addressLine2}
                  disabled={createPatient.isPending}
                  onChange={(event) => setAddressLine2(event.target.value)}
                />
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="patient-city">City</Label>
                <Input
                  id="patient-city"
                  value={city}
                  disabled={createPatient.isPending}
                  aria-invalid={Boolean(fieldErrors.city)}
                  onChange={(event) => setCity(event.target.value)}
                />
                {fieldErrors.city ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.city}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="patient-state">State</Label>
                <Input
                  id="patient-state"
                  value={state}
                  disabled={createPatient.isPending}
                  aria-invalid={Boolean(fieldErrors.state)}
                  onChange={(event) => setState(event.target.value)}
                />
                {fieldErrors.state ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.state}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="patient-postal-code">Postal code</Label>
                <Input
                  id="patient-postal-code"
                  value={postalCode}
                  disabled={createPatient.isPending}
                  aria-invalid={Boolean(fieldErrors.postalCode)}
                  onChange={(event) => setPostalCode(event.target.value)}
                />
                {fieldErrors.postalCode ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.postalCode}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="patient-country">Country</Label>
                <Input
                  id="patient-country"
                  value={country}
                  disabled={createPatient.isPending}
                  aria-invalid={Boolean(fieldErrors.country)}
                  onChange={(event) => setCountry(event.target.value)}
                />
                {fieldErrors.country ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.country}</p>
                ) : null}
              </div>
            </div>
          </fieldset>

          <fieldset className="tenant-create-form-section">
            <legend className="tenant-create-form-section-title">Emergency contact</legend>
            <div className="tenant-create-form-grid">
              <div className="tenant-create-form-field">
                <Label htmlFor="patient-emergency-name">Name</Label>
                <Input
                  id="patient-emergency-name"
                  value={emergencyContactName}
                  disabled={createPatient.isPending}
                  aria-invalid={Boolean(fieldErrors.emergencyContactName)}
                  onChange={(event) => setEmergencyContactName(event.target.value)}
                />
                {fieldErrors.emergencyContactName ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.emergencyContactName}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="patient-emergency-phone">Phone</Label>
                <Input
                  id="patient-emergency-phone"
                  value={emergencyContactPhone}
                  disabled={createPatient.isPending}
                  aria-invalid={Boolean(fieldErrors.emergencyContactPhone)}
                  onChange={(event) => setEmergencyContactPhone(event.target.value)}
                />
                {fieldErrors.emergencyContactPhone ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.emergencyContactPhone}</p>
                ) : null}
              </div>
            </div>
          </fieldset>

          <fieldset className="tenant-create-form-section">
            <legend className="tenant-create-form-section-title">Insurance (optional)</legend>
            <div className="tenant-config-checkbox-row">
              <input
                id="patient-include-insurance"
                type="checkbox"
                checked={includeInsurance}
                disabled={createPatient.isPending}
                onChange={(event) => setIncludeInsurance(event.target.checked)}
              />
              <Label htmlFor="patient-include-insurance">Include insurance details</Label>
            </div>

            {includeInsurance ? (
              <div className="tenant-create-form-grid">
                <div className="tenant-create-form-field">
                  <Label htmlFor="patient-insurance-provider">Provider name</Label>
                  <Input
                    id="patient-insurance-provider"
                    value={providerName}
                    disabled={createPatient.isPending}
                    aria-invalid={Boolean(fieldErrors["insurance.providerName"])}
                    onChange={(event) => setProviderName(event.target.value)}
                  />
                  {fieldErrors["insurance.providerName"] ? (
                    <p className="tenant-create-form-field-error">
                      {fieldErrors["insurance.providerName"]}
                    </p>
                  ) : null}
                </div>

                <div className="tenant-create-form-field">
                  <Label htmlFor="patient-insurance-policy">Policy number</Label>
                  <Input
                    id="patient-insurance-policy"
                    value={policyNumber}
                    disabled={createPatient.isPending}
                    aria-invalid={Boolean(fieldErrors["insurance.policyNumber"])}
                    onChange={(event) => setPolicyNumber(event.target.value)}
                  />
                  {fieldErrors["insurance.policyNumber"] ? (
                    <p className="tenant-create-form-field-error">
                      {fieldErrors["insurance.policyNumber"]}
                    </p>
                  ) : null}
                </div>

                <div className="tenant-create-form-field">
                  <Label htmlFor="patient-insurance-expiry">Expiry date</Label>
                  <Input
                    id="patient-insurance-expiry"
                    type="date"
                    value={expiryDate}
                    disabled={createPatient.isPending}
                    aria-invalid={Boolean(fieldErrors["insurance.expiryDate"])}
                    onChange={(event) => setExpiryDate(event.target.value)}
                  />
                  {fieldErrors["insurance.expiryDate"] ? (
                    <p className="tenant-create-form-field-error">
                      {fieldErrors["insurance.expiryDate"]}
                    </p>
                  ) : null}
                </div>

                <div className="tenant-create-form-field sm:col-span-2">
                  <Label htmlFor="patient-insurance-notes">Notes (optional)</Label>
                  <textarea
                    id="patient-insurance-notes"
                    className="tenant-config-json-editor"
                    value={insuranceNotes}
                    disabled={createPatient.isPending}
                    rows={3}
                    onChange={(event) => setInsuranceNotes(event.target.value)}
                  />
                </div>
              </div>
            ) : null}
          </fieldset>

          <div className="tenant-create-form-actions">
            <Button type="submit" disabled={createPatient.isPending}>
              {createPatient.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {createPatient.isPending ? "Creating..." : "Create patient"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
