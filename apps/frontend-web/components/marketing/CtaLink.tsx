"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackCtaClick, type CtaLocation } from "@/lib/analytics";

export type CtaLinkProps = ComponentProps<typeof Link> & {
  location: CtaLocation;
  label: string;
  experimentId?: string;
  experimentVariant?: string;
};

export function CtaLink({
  location,
  label,
  experimentId,
  experimentVariant,
  onClick,
  ...props
}: CtaLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackCtaClick(location, label, { experimentId, experimentVariant });
        onClick?.(event);
      }}
    />
  );
}
