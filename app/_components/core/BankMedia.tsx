"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { posterSrc, videoSrc } from "@/lib/media-utils";
import { cn } from "@/lib/utils";

/**
 * Punto de corte para "móvil". En móvil NO montamos los <video> animados
 * (los GIFs/MP4) para acelerar la carga; mostramos solo el poster estático.
 */
const MOBILE_QUERY = "(max-width: 767px)";

/** `true` mientras el viewport sea de escritorio. Empieza en `false` para que
 * SSR y móvil rendericen el poster (carga rápida) y solo escritorio monte el video. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsDesktop(!mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

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
