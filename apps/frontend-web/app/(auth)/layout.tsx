import Footer from "@/components/marketing/Footer";
import Navbar from "@/components/marketing/Navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing-site flex min-h-screen flex-col bg-background">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col" tabIndex={-1}>
        {children}
      </main>
      <Footer showCta={false} />
    </div>
  );
}
