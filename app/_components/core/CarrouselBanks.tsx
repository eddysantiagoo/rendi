"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Banks, DepositosBajoMonto } from "@/app/_DATA/Banks";
import Image from "next/image";
import Link from "next/link";
import { calculateMonthlyNetRate } from "@/lib/finance-utils";
import { posterSrc } from "@/lib/media-utils";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { useIsDesktop } from "@/lib/use-is-desktop";

export function CarouselBanks() {
  const combinedBanks = [...Banks, ...DepositosBajoMonto];
  const isDesktop = useIsDesktop();

  return (
    <div className="relative mx-auto md:px-4 max-w-7xl overflow-hidden">
      {/* Gradientes laterales */}
      <div className="hidden md:block pointer-events-none absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white dark:from-[#090d10] to-transparent z-10" />
      <div className="hidden md:block pointer-events-none absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white dark:from-[#090d10] to-transparent z-10" />

      <Carousel
        plugins={[
          AutoScroll({
            // En móvil lo apagamos: la animación continua repinta las capas
            // con `backdrop-filter` cada frame y genera lag. Sigue deslizable a dedo.
            active: isDesktop,
            speed: 0.8,
            stopOnMouseEnter:
              typeof window !== "undefined" && window.innerWidth >= 1024,
            stopOnInteraction: false,
            stopOnFocusIn: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="flex py-4 px-4 -ml-0">
          {combinedBanks.map((bank, index) => {
            const slug = encodeURIComponent(
              bank.name.toLowerCase().replace(/ /g, "-"),
            );
            // Nada de gifs/video en el home: preferimos la primera captura
            // estática y, si solo hay gif, su poster.
            const hero = posterSrc(
              bank.siteImages?.find((src) => !src.toLowerCase().endsWith(".gif")) ??
                bank.siteImages?.[0] ??
                bank.image,
            );
            const monthlyNet = calculateMonthlyNetRate(bank.tasaEA).toFixed(2);

            return (
              <CarouselItem
                key={index}
                className="pl-4 basis-[260px] md:basis-[280px]"
              >
                <Link
                  href={`/bank/${slug}`}
                  className="group relative block h-[430px] md:h-[460px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl hover:border-[#00d992]/40 transition-all duration-300"
                >
                  {/* Full-bleed hero image.
                      `sizes` no es el ancho de la tarjeta (280px): con
                      `object-cover` en un marco vertical solo se ve una franja
                      central de una captura apaisada, así que el navegador
                      necesita pedir un archivo ~3x más ancho para que esa
                      franja se vea nítida en pantallas retina. */}
                  <Image
                    src={hero}
                    alt={bank.name}
                    fill
                    loading="lazy"
                    quality={85}
                    sizes="540px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Progressive blur — image gradually loses sharpness toward the bottom.
                      Solo en escritorio: en móvil `backdrop-filter` (8 capas × N tarjetas
                      durante el auto-scroll) provoca lag; el degradado oscuro de abajo basta. */}
                  {isDesktop && (
                    <ProgressiveBlur
                      position="bottom"
                      height="55%"
                      blurLevels={[0.5, 1, 2, 4, 8, 16, 32, 64]}
                    />
                  )}

                  {/* Dark gradient on top of blur for text contrast */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(9,13,16,0.85) 0%, rgba(9,13,16,0.55) 25%, rgba(9,13,16,0.15) 50%, rgba(9,13,16,0) 65%)",
                    }}
                  />

                  {/* Content overlay */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 gap-3">
                    {/* Logo + name + verified */}
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/10 border border-white/20 shrink-0 backdrop-blur-sm">
                        <Image
                          src={bank.image}
                          alt={bank.name}
                          fill
                          className="object-contain p-0.5 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-white font-semibold text-base leading-tight truncate drop-shadow">
                            {bank.name}
                          </h3>
                          {bank.act && (
                            <CheckCircle2
                              className="w-4 h-4 text-[#00d992] shrink-0 drop-shadow"
                              aria-label="Tasa actualizada"
                            />
                          )}
                        </div>
                        <p className="text-white/70 text-[10px] uppercase tracking-wider truncate">
                          {bank.type || "Entidad financiera"}
                        </p>
                      </div>
                    </div>

                    {/* Stats + CTA row — glass on top of gradient */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-baseline gap-1 px-2.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                        <span className="text-[#00d992] font-black text-sm leading-none">
                          {bank.tasaEA}%
                        </span>
                        <span className="text-white/60 text-[9px] uppercase tracking-wider">
                          EA
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1 px-2.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                        <span className="text-[#8bf5cf] font-bold text-sm leading-none">
                          {monthlyNet}%
                        </span>
                        <span className="text-white/60 text-[9px] uppercase tracking-wider">
                          mes
                        </span>
                      </div>
                      <span className="ml-auto inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-black group-hover:bg-[#00d992] transition-all shadow-md">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
