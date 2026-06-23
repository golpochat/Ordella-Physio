/** Copilot routes are intentionally chrome-free (no sidebar/topbar). */
export default function CopilotLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
