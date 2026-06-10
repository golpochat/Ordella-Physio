export function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed bg-muted/30">
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
