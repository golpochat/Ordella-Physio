import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Features",
  description:
    "Explore Ordella Physio features — scheduling, patient management, SOAP notes, billing, reporting, and more.",
  path: "/features",
});

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
