import { marketingCardClass, marketingHeading } from "@/lib/marketing-ui";

export type HomeTestimonialProps = {
  quote: string;
  author: string;
  role: string;
};

export function HomeTestimonial({ quote, author, role }: HomeTestimonialProps) {
  return (
    <blockquote className={`${marketingCardClass} fade-in`}>
      <p className="mb-md text-lg italic leading-relaxed text-foreground">&ldquo;{quote}&rdquo;</p>
      <footer>
        <p className="font-display font-semibold text-foreground">{author}</p>
        <p className={`text-sm ${marketingHeading.body}`}>{role}</p>
      </footer>
    </blockquote>
  );
}
