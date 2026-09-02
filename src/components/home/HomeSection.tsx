import { cn } from "@/lib/utils";

type HomeSectionVariant = "white" | "soft" | "accent" | "dark";

const variantClasses: Record<HomeSectionVariant, string> = {
  white: "bg-white",
  soft: "bg-[#f5f5f3]",
  accent: "bg-[#eef2e6]",
  dark: "bg-[#0a0a0a] text-white",
};

export function HomeSection({
  children,
  variant = "white",
  className,
  innerClassName,
  id,
}: {
  children: React.ReactNode;
  variant?: HomeSectionVariant;
  className?: string;
  innerClassName?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 lg:py-24", variantClasses[variant], className)}>
      <div className={cn("container-site", innerClassName)}>{children}</div>
    </section>
  );
}
