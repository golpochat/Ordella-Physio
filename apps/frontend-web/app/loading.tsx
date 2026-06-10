export default function RootLoading() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 p-6">
      <div className="h-10 w-64 animate-pulse rounded-md bg-muted" />
      <div className="h-6 w-96 animate-pulse rounded-md bg-muted" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-40 w-full animate-pulse rounded-md bg-muted" />
        <div className="h-40 w-full animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}
