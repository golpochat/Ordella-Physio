export function resolveAvatarUrl(avatarUrl?: string | null): string | null {
  if (!avatarUrl) {
    return null;
  }

  if (avatarUrl.startsWith("http://") || avatarUrl.startsWith("https://")) {
    return avatarUrl;
  }

  if (avatarUrl.startsWith("/api/")) {
    return avatarUrl;
  }

  if (avatarUrl.startsWith("/auth/")) {
    return `/api/auth${avatarUrl.slice("/auth".length)}`;
  }

  return avatarUrl;
}

export function getAvatarInitials(firstName?: string, lastName?: string, email?: string): string {
  const first = firstName?.trim().charAt(0) ?? "";
  const last = lastName?.trim().charAt(0) ?? "";
  const initials = `${first}${last}`.toUpperCase();

  if (initials) {
    return initials;
  }

  return email?.trim().charAt(0).toUpperCase() ?? "?";
}
