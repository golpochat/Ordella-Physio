import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ACCESS_DENIED_COPY } from "@/lib/auth-ui-messages";

export default function AccessDeniedPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{ACCESS_DENIED_COPY.title}</h1>
        <p className="text-muted-foreground">{ACCESS_DENIED_COPY.description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/login?reason=access-denied">{ACCESS_DENIED_COPY.signInLabel}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">{ACCESS_DENIED_COPY.homeLabel}</Link>
        </Button>
      </div>
    </main>
  );
}
