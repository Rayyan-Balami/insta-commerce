// import * as React from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// import Autoplay from "embla-carousel-autoplay"

// export default function PromotionCarousel() {
//   const dummyImages = [
//     "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/ec7cbdeb805025da.jpg?q=20", // Placeholder image 1
//     "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/6167b56dad6d1330.jpg?q=20", // Placeholder image 2
//     "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/7409480987a9a093.jpg?q=20", // Placeholder image 3
//     "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/8d7c5a9f8990a71b.jpg?q=20", // Placeholder image 4
//     "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d32fe11cd7824fb0.jpeg?q=20", // Placeholder image 5
//   ];

//   return (
//     <Carousel
//       opts={{
//         loop: true,
//         duration: 40,
//       }}
//       plugins={[
//         Autoplay({
//           delay: 5000,
//         }),
//       ]}
//       className="w-full space-y-4"
//     >
//       <CarouselContent>
//         {dummyImages.map((img, index) => (
//           <CarouselItem key={index}>
//             <Card className="border-0 overflow-hidden">
//               <CardContent className="p-0 h-64">
//                 <img
//                   src={img}
//                   alt="pr"
//                   className="h-full w-full object-cover object-center"
//                 />
//               </CardContent>
//             </Card>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <div className="space-x-4">
//         <CarouselPrevious />
//         <CarouselNext />
//       </div>
//     </Carousel>
//   );
// }

import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const PromotionCarousel = () => {
  const dummyImages = [
    "https://static.vecteezy.com/system/resources/thumbnails/008/174/590/small_2x/fashion-advertising-web-banner-illustration-vector.jpg", // Placeholder image 1
    "https://marketplace.canva.com/EAFIMHQ5yhE/1/0/1600w/canva-orange-and-teal-summer-sale-kids-fashion-bright-website-banner-L6kUMOWkkho.jpg", // Placeholder image 2
    "https://images.all-free-download.com/images/thumbjpg/ecommerce_website_banner_template_customers_sketch_flat_design_6920122.jpg", // Placeholder image 3
    "https://images.template.net/108566/mens-fashion-banner-obt4g.jpg", // Placeholder image 4,
  ];
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 8000, // 8 seconds
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
      ]}
      carouselOptions={{
        loop: true,
      }}
    >
      <CarouselNext />
      <CarouselPrevious />
      <div className="relative border rounded-md overflow-hidden">
        <CarouselMainContainer className="h-60">
          {dummyImages.map((_, index) => (
            <SliderMainItem key={index} className="bg-transparent p-0">
              <div className="size-full">
                <img
                  src={dummyImages[index]}
                  alt="promotion"
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <CarouselThumbsContainer className="gap-x-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-1 rounded-full">
            {dummyImages.map((_, index) => (
              <CarouselIndicator key={index} index={index} />
            ))}
          </CarouselThumbsContainer>
        </div>
      </div>
    </Carousel>
  );
};

export default PromotionCarousel;
