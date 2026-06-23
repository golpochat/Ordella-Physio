"use client";

import { useEffect, useState } from "react";
import { AvatarUploader } from "@/components/users/AvatarUploader";
import { useMyProfile } from "@/hooks/useAccountProfile";

type ProfileAvatarSectionProps = {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatarUrl?: string | null;
  readOnly?: boolean;
};

export function ProfileAvatarSection({
  firstName: firstNameProp,
  lastName: lastNameProp,
  email: emailProp,
  avatarUrl: avatarUrlProp,
  readOnly = false,
}: ProfileAvatarSectionProps) {
  const profileQuery = useMyProfile();
  const profile = profileQuery.data;
  const [avatarUrl, setAvatarUrl] = useState<string | null>(avatarUrlProp ?? null);

  const firstName = firstNameProp ?? profile?.firstName;
  const lastName = lastNameProp ?? profile?.lastName;
  const email = emailProp ?? profile?.email;

  useEffect(() => {
    if (avatarUrlProp !== undefined) {
      setAvatarUrl(avatarUrlProp);
      return;
    }

    setAvatarUrl(profile?.avatarUrl ?? null);
  }, [avatarUrlProp, profile?.avatarUrl]);

  if (!firstName && !lastName && !email && profileQuery.isLoading) {
    return null;
  }

  return (
    <AvatarUploader
      avatarUrl={avatarUrl}
      firstName={firstName}
      lastName={lastName}
      email={email}
      readOnly={readOnly}
      onAvatarChange={setAvatarUrl}
    />
  );
}
