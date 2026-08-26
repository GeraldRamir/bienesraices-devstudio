import Image from "next/image";
import Link from "next/link";

export function HeroIllustration() {
  return (
    <div className="relative w-screen shrink-0">
      <div className="relative h-[50vh] min-h-[320px] w-full">
        <Image
          src="/images/hero-landscape-organic.png"
          alt="Rolling green hills with cypress trees and a Mediterranean villa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center px-5 pb-6 pt-[108px] text-center sm:px-8 sm:pb-8 sm:pt-[118px]">
        <div className="mb-4 inline-flex items-center gap-0 rounded-full border border-black/[0.05] bg-white px-1 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <span className="rounded-full bg-[#e4ead4] px-2.5 py-[3px] text-[11px] font-semibold text-[#445522]">
            New
          </span>
          <span className="px-2.5 text-[12px] font-medium text-[#6b6b6b]">
            Tour Management Platform
          </span>
        </div>

        <h1 className="max-w-[820px] font-serif text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.06] tracking-[-0.015em] text-[#0a0a0a]">
          Transform Operations into
          <br />
          <em className="font-semibold italic text-[#6b7f3a]">
            Unforgettable Memories.
          </em>
        </h1>

        <p className="mt-3 max-w-[420px] text-[14px] font-medium leading-[1.6] tracking-[-0.005em] text-[#4a4a4a] sm:text-[15px]">
          All-in-one tools to optimize bookings and craft seamless travel
          experiences for your clients.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <Link
            href="#"
            className="rounded-full bg-[#0a0a0a] px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href="#"
            className="rounded-full border border-black/[0.1] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#1a1a1a] transition-colors hover:bg-[#f5f5f3]"
          >
            Book a Demo
          </Link>
        </div>
      </div>

      <HeroIllustration />
    </section>
  );
}
