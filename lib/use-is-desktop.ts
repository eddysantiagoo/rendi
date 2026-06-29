"use client";

import { useEffect, useState } from "react";

/**
 * Punto de corte para "móvil". En móvil evitamos efectos pesados
 * (videos animados, `backdrop-filter`) para acelerar la carga y el scroll.
 */
const MOBILE_QUERY = "(max-width: 767px)";

/**
 * `true` mientras el viewport sea de escritorio.
 *
 * Empieza en `false` para que SSR y móvil rendericen la versión ligera
 * (sin video, sin blur) y solo escritorio monte los efectos pesados.
 */
export function useIsDesktop(): boolean {
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
