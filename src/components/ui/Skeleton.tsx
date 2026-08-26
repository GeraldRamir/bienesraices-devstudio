import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[28px] bg-gradient-to-r from-black/[0.04] via-black/[0.07] to-black/[0.04] bg-[length:200%_100%]",
        className
      )}
      style={{ animation: "hz-shimmer 1.8s ease-in-out infinite" }}
      {...props}
    />
  );
}

export function SkeletonText({ className }: { className?: string }) {
  return <Skeleton className={cn("h-4 rounded-full", className)} />;
}

export function SkeletonPill({ className }: { className?: string }) {
  return <Skeleton className={cn("h-9 w-28 rounded-full", className)} />;
}
