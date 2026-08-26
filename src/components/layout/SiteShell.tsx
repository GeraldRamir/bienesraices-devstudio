import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export function SiteShell({
  children,
  whatsapp = true,
}: {
  children: React.ReactNode;
  whatsapp?: boolean;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      {whatsapp && <WhatsAppButton />}
    </>
  );
}

export function PageHero({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <section className="border-b border-black/[0.06] bg-white pt-[120px] pb-12 sm:pt-[132px] sm:pb-16">
      <div className="container-site">
        {eyebrow && (
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent-dark">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl font-serif text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-ink">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
