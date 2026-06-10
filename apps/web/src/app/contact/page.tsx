import { createMetadata } from "@/lib/seo";
import ContactPageClient from "./contact-client";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contact Ordella Physio for support, sales, or demo requests.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
