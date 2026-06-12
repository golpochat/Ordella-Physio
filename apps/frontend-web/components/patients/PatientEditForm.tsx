"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useUpdateClinicPatient } from "@/hooks/useClinicPortal";
import { parsePatientUpdateErrors } from "@/lib/clinic-patient-api-errors";
import type {
  ClinicPatientDetailResponse,
  ClinicPatientGender,
} from "@/lib/clinic-portal-types";

const PATIENT_GENDER_OPTIONS: Array<{ value: ClinicPatientGender; label: string }> = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PatientEditFormProps = {
  detail: ClinicPatientDetailResponse;
};

export function PatientEditForm({ detail }: PatientEditFormProps) {
  const router = useRouter();
  const updatePatient = useUpdateClinicPatient(detail.patient.id);

  const [firstName, setFirstName] = useState(detail.patient.firstName);
  const [lastName, setLastName] = useState(detail.patient.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(detail.patient.dateOfBirth ?? "");
  const [gender, setGender] = useState<ClinicPatientGender>(
    (detail.patient.gender as ClinicPatientGender) || "MALE",
  );
  const [bloodGroup, setBloodGroup] = useState(detail.patient.bloodGroup ?? "");
  const [phone, setPhone] = useState(detail.patient.phone ?? "");
  const [email, setEmail] = useState(detail.patient.email ?? "");
  const [addressLine1, setAddressLine1] = useState(detail.patient.addressLine1 ?? "");
  const [addressLine2, setAddressLine2] = useState(detail.patient.addressLine2 ?? "");
  const [city, setCity] = useState(detail.patient.city ?? "");
  const [state, setState] = useState(detail.patient.state ?? "");
  const [postalCode, setPostalCode] = useState(detail.patient.postalCode ?? "");
  const [country, setCountry] = useState(detail.patient.country ?? "");
  const [emergencyContactName, setEmergencyContactName] = useState(
    detail.patient.emergencyContactName ?? "",
  );
  const [emergencyContactPhone, setEmergencyContactPhone] = useState(
    detail.patient.emergencyContactPhone ?? "",
  );
  const [includeInsurance, setIncludeInsurance] = useState(Boolean(detail.insurance));
  const [providerName, setProviderName] = useState(detail.insurance?.providerName ?? "");
  const [policyNumber, setPolicyNumber] = useState(detail.insurance?.policyNumber ?? "");
  const [expiryDate, setExpiryDate] = useState(detail.insurance?.expiryDate ?? "");
  const [insuranceNotes, setInsuranceNotes] = useState(detail.insurance?.notes ?? "");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    setFirstName(detail.patient.firstName);
    setLastName(detail.patient.lastName);
    setDateOfBirth(detail.patient.dateOfBirth ?? "");
    setGender((detail.patient.gender as ClinicPatientGender) || "MALE");
    setBloodGroup(detail.patient.bloodGroup ?? "");
    setPhone(detail.patient.phone ?? "");
    setEmail(detail.patient.email ?? "");
    setAddressLine1(detail.patient.addressLine1 ?? "");
    setAddressLine2(detail.patient.addressLine2 ?? "");
    setCity(detail.patient.city ?? "");
    setState(detail.patient.state ?? "");
    setPostalCode(detail.patient.postalCode ?? "");
    setCountry(detail.patient.country ?? "");
    setEmergencyContactName(detail.patient.emergencyContactName ?? "");
    setEmergencyContactPhone(detail.patient.emergencyContactPhone ?? "");
    setIncludeInsurance(Boolean(detail.insurance));
    setProviderName(detail.insurance?.providerName ?? "");
    setPolicyNumber(detail.insurance?.policyNumber ?? "");
    setExpiryDate(detail.insurance?.expiryDate ?? "");
    setInsuranceNotes(detail.insurance?.notes ?? "");
  }, [detail]);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }

    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }

    if (!phone.trim()) {
      errors.phone = "Phone is required";
    }

    if (email.trim() && !EMAIL_PATTERN.test(email.trim())) {
      errors.email = "Enter a valid email";
    }

    if (!dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of birth is required";
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
        <CardTitle>Edit patient</CardTitle>
        <CardDescription>Update demographics, contact details, and insurance.</CardDescription>
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

            updatePatient.mutate(
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
                  toast.success(response.message ?? "Patient updated successfully.");
                  router.push(`/clinic/patients/${detail.patient.id}`);
                },
                onError: (error) => {
                  const parsed = parsePatientUpdateErrors(error);
                  if (parsed.forbidden || parsed.tenantMismatch) {
                    router.replace("/forbidden");
                    return;
                  }
                  if (parsed.notFound) {
                    toast.error(parsed.generalError ?? "Patient does not exist.");
                    router.replace("/clinic/patients");
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
                <Label htmlFor="edit-patient-first-name">First name</Label>
                <Input
                  id="edit-patient-first-name"
                  value={firstName}
                  disabled={updatePatient.isPending}
                  aria-invalid={Boolean(fieldErrors.firstName)}
                  onChange={(event) => setFirstName(event.target.value)}
                />
                {fieldErrors.firstName ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.firstName}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="edit-patient-last-name">Last name</Label>
                <Input
                  id="edit-patient-last-name"
                  value={lastName}
                  disabled={updatePatient.isPending}
                  aria-invalid={Boolean(fieldErrors.lastName)}
                  onChange={(event) => setLastName(event.target.value)}
                />
                {fieldErrors.lastName ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.lastName}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="edit-patient-dob">Date of birth</Label>
                <Input
                  id="edit-patient-dob"
                  type="date"
                  value={dateOfBirth}
                  disabled={updatePatient.isPending}
                  aria-invalid={Boolean(fieldErrors.dateOfBirth)}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                />
                {fieldErrors.dateOfBirth ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.dateOfBirth}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="edit-patient-gender">Gender</Label>
                <select
                  id="edit-patient-gender"
                  className="tenant-create-form-select"
                  value={gender}
                  disabled={updatePatient.isPending}
                  onChange={(event) => setGender(event.target.value as ClinicPatientGender)}
                >
                  {PATIENT_GENDER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="edit-patient-blood-group">Blood group (optional)</Label>
                <Input
                  id="edit-patient-blood-group"
                  value={bloodGroup}
                  disabled={updatePatient.isPending}
                  onChange={(event) => setBloodGroup(event.target.value)}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="tenant-create-form-section">
            <legend className="tenant-create-form-section-title">Contact info</legend>
            <div className="tenant-create-form-grid">
              <div className="tenant-create-form-field">
                <Label htmlFor="edit-patient-phone">Phone</Label>
                <Input
                  id="edit-patient-phone"
                  value={phone}
                  disabled={updatePatient.isPending}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  onChange={(event) => setPhone(event.target.value)}
                />
                {fieldErrors.phone ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.phone}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="edit-patient-email">Email (optional)</Label>
                <Input
                  id="edit-patient-email"
                  type="email"
                  value={email}
                  disabled={updatePatient.isPending}
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
                <Label htmlFor="edit-patient-address-line-1">Address line 1</Label>
                <Input
                  id="edit-patient-address-line-1"
                  value={addressLine1}
                  disabled={updatePatient.isPending}
                  aria-invalid={Boolean(fieldErrors.addressLine1)}
                  onChange={(event) => setAddressLine1(event.target.value)}
                />
                {fieldErrors.addressLine1 ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.addressLine1}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field sm:col-span-2">
                <Label htmlFor="edit-patient-address-line-2">Address line 2 (optional)</Label>
                <Input
                  id="edit-patient-address-line-2"
                  value={addressLine2}
                  disabled={updatePatient.isPending}
                  onChange={(event) => setAddressLine2(event.target.value)}
                />
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="edit-patient-city">City</Label>
                <Input
                  id="edit-patient-city"
                  value={city}
                  disabled={updatePatient.isPending}
                  onChange={(event) => setCity(event.target.value)}
                />
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="edit-patient-state">State</Label>
                <Input
                  id="edit-patient-state"
                  value={state}
                  disabled={updatePatient.isPending}
                  onChange={(event) => setState(event.target.value)}
                />
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="edit-patient-postal-code">Postal code</Label>
                <Input
                  id="edit-patient-postal-code"
                  value={postalCode}
                  disabled={updatePatient.isPending}
                  onChange={(event) => setPostalCode(event.target.value)}
                />
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="edit-patient-country">Country</Label>
                <Input
                  id="edit-patient-country"
                  value={country}
                  disabled={updatePatient.isPending}
                  onChange={(event) => setCountry(event.target.value)}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="tenant-create-form-section">
            <legend className="tenant-create-form-section-title">Emergency contact</legend>
            <div className="tenant-create-form-grid">
              <div className="tenant-create-form-field">
                <Label htmlFor="edit-patient-emergency-name">Name</Label>
                <Input
                  id="edit-patient-emergency-name"
                  value={emergencyContactName}
                  disabled={updatePatient.isPending}
                  aria-invalid={Boolean(fieldErrors.emergencyContactName)}
                  onChange={(event) => setEmergencyContactName(event.target.value)}
                />
                {fieldErrors.emergencyContactName ? (
                  <p className="tenant-create-form-field-error">{fieldErrors.emergencyContactName}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="edit-patient-emergency-phone">Phone</Label>
                <Input
                  id="edit-patient-emergency-phone"
                  value={emergencyContactPhone}
                  disabled={updatePatient.isPending}
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
                id="edit-patient-include-insurance"
                type="checkbox"
                checked={includeInsurance}
                disabled={updatePatient.isPending}
                onChange={(event) => setIncludeInsurance(event.target.checked)}
              />
              <Label htmlFor="edit-patient-include-insurance">Include insurance details</Label>
            </div>

            {includeInsurance ? (
              <div className="tenant-create-form-grid">
                <div className="tenant-create-form-field">
                  <Label htmlFor="edit-patient-insurance-provider">Provider name</Label>
                  <Input
                    id="edit-patient-insurance-provider"
                    value={providerName}
                    disabled={updatePatient.isPending}
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
                  <Label htmlFor="edit-patient-insurance-policy">Policy number</Label>
                  <Input
                    id="edit-patient-insurance-policy"
                    value={policyNumber}
                    disabled={updatePatient.isPending}
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
                  <Label htmlFor="edit-patient-insurance-expiry">Expiry date</Label>
                  <Input
                    id="edit-patient-insurance-expiry"
                    type="date"
                    value={expiryDate}
                    disabled={updatePatient.isPending}
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
                  <Label htmlFor="edit-patient-insurance-notes">Notes (optional)</Label>
                  <textarea
                    id="edit-patient-insurance-notes"
                    className="tenant-config-json-editor"
                    value={insuranceNotes}
                    disabled={updatePatient.isPending}
                    rows={3}
                    onChange={(event) => setInsuranceNotes(event.target.value)}
                  />
                </div>
              </div>
            ) : null}
          </fieldset>

          <div className="tenant-create-form-actions">
            <Button type="submit" disabled={updatePatient.isPending}>
              {updatePatient.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {updatePatient.isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
