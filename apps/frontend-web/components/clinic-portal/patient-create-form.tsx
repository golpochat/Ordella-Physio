"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useCreateClinicPatient } from "@/hooks/useClinicPortal";

export function ClinicPatientCreateForm() {
  const router = useRouter();
  const createPatient = useCreateClinicPatient();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register patient</CardTitle>
        <CardDescription>Add a new patient to your clinic.</CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            createPatient.mutate(
              {
                firstName,
                lastName,
                email: email || undefined,
                phone: phone || undefined,
              },
              {
                onSuccess: (patient) => {
                  toast.success("Patient created");
                  router.push(`/clinic/patients/${patient.id}`);
                },
                onError: () => toast.error("Failed to create patient"),
              },
            );
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
          </div>
          <Button type="submit" disabled={createPatient.isPending}>
            {createPatient.isPending ? "Creating..." : "Create patient"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
