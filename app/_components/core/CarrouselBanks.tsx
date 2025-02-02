import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Banks from "@/app/_DATA/Banks";
import Image from "next/image";

export function CarouselBanks() {
  return (
    <div className="relative container mx-auto px-4 overflow-hidden">

      <div className="pointer-events-none absolute top-0 left-0 h-full w-44 bg-gradient-to-r from-white dark:from-[#090d10] to-transparent z-10" />
 
      <div className="pointer-events-none absolute top-0 right-0 h-full w-44 bg-gradient-to-l from-white dark:from-[#090d10] to-transparent z-10" />

      <Carousel
        plugins={[
          AutoScroll({
            active: true,
            speed: 1,
            stopOnInteraction: false,
            stopOnFocusIn: false,
            stopOnMouseEnter: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {Banks.map((bank, index) => (
            <CarouselItem
              key={index}
              className="w-full p-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex gap-4 items-center">
                    <Image
                      src={bank.image}
                      alt={bank.name}
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                    <span className="text-xl font-semibold">{bank.name}</span>
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
