"use client";

import Image from "next/image";
import { posterSrc, videoSrc } from "@/lib/media-utils";
import { useIsDesktop } from "@/lib/use-is-desktop";
import { cn } from "@/lib/utils";

interface BankMediaProps {
  /** Ruta original del asset (puede ser un .gif, que se sirve como .mp4). */
  src: string;
  alt: string;
  /** Clases de estilo (object-cover, transiciones, etc.). */
  className?: string;
  /** `sizes` para el <Image> de Next cuando NO es video. */
  sizes?: string;
  priority?: boolean;
}

/**
 * Renderiza la versión optimizada de un asset de banco que llena su contenedor:
 *   - Si el origen es un GIF → <video> con el MP4 (animado, ~95% más liviano).
 *   - En caso contrario → <Image fill> optimizado por Next.js.
 *
 * El contenedor padre debe ser `relative` con dimensiones propias.
 */
export function BankMedia({ src, alt, className, sizes, priority }: BankMediaProps) {
  const video = videoSrc(src);
  const isDesktop = useIsDesktop();

  // En móvil mostramos solo el poster estático del GIF para acelerar la carga.
  if (video && isDesktop) {
    return (
      <video
        src={video}
        poster={posterSrc(src)}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
      />
    );
  }

  // Para GIFs (en móvil) servimos su poster .webp; el resto, su ruta original.
  return (
    <Image
      src={posterSrc(src)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={className}
    />
  );
}
