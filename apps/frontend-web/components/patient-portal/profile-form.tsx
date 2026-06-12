"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePatientProfile, useUpdatePatientProfile } from "@/hooks/usePatientPortal";
import { useAuthStore } from "@/store/auth.store";

export function ProfileForm() {
  const user = useAuthStore((state) => state.user);
  const { data: profile, isLoading, isError, refetch } = usePatientProfile();
  const updateProfile = useUpdatePatientProfile();
  const profileSource = useMemo(() => profile ?? user, [profile, user]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (profileSource) {
      setFirstName(profileSource.firstName ?? "");
      setLastName(profileSource.lastName ?? "");
      setEmail(profileSource.email ?? "");
    }
  }, [profileSource]);

  if (!profileSource && isLoading) {
    return <PageLoading rows={4} />;
  }

  if (!profileSource && isError) {
    return <PageError onRetry={() => void refetch()} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile settings</CardTitle>
        <CardDescription>Update your personal information.</CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            updateProfile.mutate(
              { firstName, lastName, email },
              {
                onSuccess: () => toast.success("Profile updated"),
                onError: () =>
                  toast.error("Unable to update profile. The endpoint may not be available yet."),
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
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
          <Button type="submit" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
