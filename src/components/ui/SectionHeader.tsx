import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-3 text-[12px] font-semibold uppercase tracking-[0.12em]", dark ? "text-accent" : "text-accent-dark")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-tight", dark ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-3 max-w-2xl text-[15px] leading-relaxed", dark ? "text-white/65" : "text-muted", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function FadeIn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("animate-fade-up", className)}>{children}</div>;
}
