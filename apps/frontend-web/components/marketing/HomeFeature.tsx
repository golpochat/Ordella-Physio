import type { ReactNode } from "react";
import { marketingCardClass, marketingHeading } from "@/lib/marketing-ui";

export type HomeFeatureProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function HomeFeature({ icon, title, description }: HomeFeatureProps) {
  return (
    <article className={`${marketingCardClass} fade-in`}>
      <div className="marketing-feature-icon" aria-hidden>
        {icon}
      </div>
      <h3 className={`mb-sm ${marketingHeading.h4}`}>{title}</h3>
      <p className={marketingHeading.body}>{description}</p>
    </article>
  );
}
