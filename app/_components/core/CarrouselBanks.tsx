import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Banks, DepositosBajoMonto } from "@/app/_DATA/Banks";
import Image from "next/image";

export function CarouselBanks() {
  const combinedBanks = [...Banks, ...DepositosBajoMonto];

  return (
    <div className="relative mx-auto px-4 max-w-7xl overflow-hidden">
      {/* Gradientes para mejorar la visibilidad */}
      <div className="hidden md:block pointer-events-none absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white dark:from-[#090d10] to-transparent z-10" />
      <div className="hidden md:block pointer-events-none absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white dark:from-[#090d10] to-transparent z-10" />

      <Carousel
        plugins={[
          AutoScroll({
            active: true,
            speed: 1,
            stopOnMouseEnter:
              typeof window !== "undefined" && window.innerWidth >= 1024,
            stopOnInteraction: false,
            stopOnFocusIn: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="flex snap-x scroll-pl-4">
          {combinedBanks.map((bank, index) => (
            <CarouselItem
              key={index}
              className="w-full p-2 sm:basis-1/1 md:basis-1/1 lg:basis-1/3"
            >
              <Card className="transition-all hover:shadow-lg hover:scale-[1.03] duration-200">
                <CardContent className="flex items-center justify-between p-4 ">
                  <div className="flex gap-4 items-center">
                    <Image
                      src={bank.image}
                      alt={bank.name}
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                    <div>
                      <span className="text-xl font-semibold">{bank.name}</span>
                      <p className="text-neutral-500 text-sm">
                        {bank.type || "Cuenta de ahorros"}
                      </p>
                    </div>
                  </div>
                  <span className="text-4xl font-bold text-[#00d983]">
                    {bank.tasaEA}%
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
