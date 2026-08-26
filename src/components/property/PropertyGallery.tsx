"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Grid3X3, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxOpen, activeIndex, goTo]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-cream-dark text-muted">
        Sin imágenes disponibles
      </div>
    );
  }

  const thumbs = images.slice(0, 5);
  const extraCount = images.length - 5;

  return (
    <>
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group relative block w-full overflow-hidden rounded-2xl"
          aria-label="Abrir galería de fotos"
        >
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={images[activeIndex]}
              alt={`${title} — foto ${activeIndex + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 70vw"
              priority
            />
          </div>
        </button>

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
            {thumbs.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all",
                  activeIndex === i
                    ? "border-accent-dark ring-2 ring-accent-dark/20"
                    : "border-transparent opacity-80 hover:opacity-100"
                )}
                aria-label={`Ver foto ${i + 1}`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="120px" />
                {i === 4 && extraCount > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold text-white">
                    +{extraCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {images.length > 1 && (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-cream-dark"
          >
            <Grid3X3 className="h-4 w-4" />
            Ver todas las fotos ({images.length})
          </button>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Galería de fotos"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Cerrar galería"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="relative h-[70vh] w-full max-w-5xl">
            <Image
              src={images[activeIndex]}
              alt={`${title} — foto ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
