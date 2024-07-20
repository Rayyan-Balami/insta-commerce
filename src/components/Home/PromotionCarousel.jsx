import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay"

export default function PromotionCarousel() {
  const dummyImages = [
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/ec7cbdeb805025da.jpg?q=20", // Placeholder image 1
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/6167b56dad6d1330.jpg?q=20", // Placeholder image 2
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/7409480987a9a093.jpg?q=20", // Placeholder image 3
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/8d7c5a9f8990a71b.jpg?q=20", // Placeholder image 4
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d32fe11cd7824fb0.jpeg?q=20", // Placeholder image 5
  ];

  return (
    <Carousel
      opts={{
        loop: true,
        duration: 40,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full space-y-4"
    >
      <CarouselContent>
        {dummyImages.map((img, index) => (
          <CarouselItem key={index}>
            <Card className="border-0 overflow-hidden">
              <CardContent className="p-0 h-64">
                <img
                  src={img}
                  alt="pr"
                  className="h-full w-full object-cover object-center"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="space-x-4">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
