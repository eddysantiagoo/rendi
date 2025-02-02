import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Banks from "@/app/_DATA/Banks";
import Image from "next/image";

export function CarouselBanks() {
  return (
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
            className="basis-1/4 p-4 sm:basis-1/2  md:basis-1/3 cursor-pointer hover:opacity-70 transition-opacity duration-300 ease-in-out"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-between p-4 relative">
                  <div className="flex gap-4 items-center">
                    <Image
                      src={bank.image}
                      alt={bank.name}
                      width={50}
                      height={50}
                      className="mb-2 rounded-lg"
                    />
                    <span className="text-xl font-semibold">{bank.name}</span>
                  </div>
                  <span className="text-4xl font-bold text-[#00d983]">
                    {bank.tasaEA}%
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
