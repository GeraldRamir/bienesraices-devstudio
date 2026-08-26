import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionLink({
  href,
  children,
  className,
  dark = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "hz-btn-editorial group",
        dark && "border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/15 hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)]",
        className,
      )}
    >
      {children}
      <ArrowUpRight className="hz-btn-editorial__arrow size-4" strokeWidth={2.2} />
    </Link>
  );
}
