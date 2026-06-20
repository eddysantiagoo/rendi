/**
 * Utilidades para servir versiones optimizadas de los assets de los bancos.
 *
 * Los GIFs originales (algunos de 10-17MB) fueron convertidos a:
 *   - `<nombre>.mp4`          → versión animada (≈95% más liviana)
 *   - `<nombre>.poster.webp`  → primer frame estático para previews/cards
 *
 * Para cualquier otra imagen (.png/.webp/.jpg) se devuelve la ruta original,
 * que Next.js ya optimiza on-demand cuando NO usamos `unoptimized`.
 */

const isGif = (src: string) => src.toLowerCase().endsWith(".gif");

/** ¿Esta imagen tiene una versión animada en video? */
export const isAnimated = isGif;

/** Devuelve una imagen estática lista para optimizar por Next.js. */
export function posterSrc(src: string): string {
  return isGif(src) ? src.replace(/\.gif$/i, ".poster.webp") : src;
}

/** Devuelve la ruta del video (mp4) para un GIF, o null si no aplica. */
export function videoSrc(src: string): string | null {
  return isGif(src) ? src.replace(/\.gif$/i, ".mp4") : null;
}
