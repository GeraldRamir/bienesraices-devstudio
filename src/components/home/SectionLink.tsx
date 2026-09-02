import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionLink({
  href,
  children,
  className,
  dark = false,
  variant = "outline",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  variant?: "outline" | "primary";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "pf-btn group",
        variant === "primary"
          ? dark
            ? "bg-white text-ink hover:bg-white/90"
            : "pf-btn--primary"
          : dark
            ? "pf-btn--ghost-dark"
            : "pf-btn--outline",
        className,
      )}
    >
      {children}
      <ArrowUpRight className="size-4" strokeWidth={2.2} />
    </Link>
  );
}
