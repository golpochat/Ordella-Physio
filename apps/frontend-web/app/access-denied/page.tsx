import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Access denied</h1>
      <p className="text-muted-foreground">
        You do not have the required permission to view this page. Contact your clinic administrator if
        you believe this is an error.
      </p>
      <Link href="/" className="text-primary underline-offset-4 hover:underline">
        Return home
      </Link>
    </main>
  );
}
