import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Horizon Bienes Raíces - Inicio">
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M16 4L28 12V24L16 32L4 24V12L16 4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M16 10L22 14V22L16 26L10 22V14L16 10Z"
          fill="currentColor"
        />
      </svg>
      <span className="hidden font-serif text-[17px] font-semibold tracking-tight text-ink sm:inline">
        Horizon
      </span>
    </Link>
  );
}
