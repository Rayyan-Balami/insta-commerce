import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Play } from "lucide-react";

const ProductCarousel = () => {
  const dummyImages = [
    "https://static.vecteezy.com/system/resources/thumbnails/008/174/590/small_2x/fashion-advertising-web-banner-illustration-vector.jpg", // Placeholder image 1
    "https://marketplace.canva.com/EAFIMHQ5yhE/1/0/1600w/canva-orange-and-teal-summer-sale-kids-fashion-bright-website-banner-L6kUMOWkkho.jpg", // Placeholder image 2
    "https://images.all-free-download.com/images/thumbjpg/ecommerce_website_banner_template_customers_sketch_flat_design_6920122.jpg", // Placeholder image 3
    "https://images.template.net/108566/mens-fashion-banner-obt4g.jpg", // Placeholder image 4,
  ];
  return (
    <Carousel
      carouselOptions={{
        loop: true,
      }}
    >
      {/* // Adding a div with relative class bcuz next/prev icons were not showing little down from center due to the carousel container also having the thumb container */}
      <div className="relative">
        <CarouselNext />
        <CarouselPrevious />

        <div className="relative border rounded-md overflow-hidden">
          <CarouselMainContainer className="aspect-square">
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
          {/* //YT video preview */}

          <Drawer className="dark">
            <DrawerTrigger
              className="group absolute bottom-2 right-2 w-28 hover:w-48 transition-all aspect-video
             shadow-md rounded-md overflow-hidden"
            >
              <img
                src="https://img.youtube.com/vi/-P_bf-PnocE/maxresdefault.jpg"
                alt="Video Preview"
                className="size-full object-cover object-center
                  brightness-75 group-hover:brightness-100 transition-all duration-300
                  "
              />
              <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white group-hover:animate-pulse" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-center">Video Preview</DrawerTitle>
              </DrawerHeader>
              <DrawerDescription className="px-4">
                <iframe
                  className="w-full max-w-screen-sm mx-auto aspect-video border-none rounded-lg"
                  src="https://www.youtube.com/embed/-P_bf-PnocE"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </DrawerDescription>
              <DrawerFooter className="mx-auto">
                <DrawerClose>
                  <Button variant="ghost">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <CarouselThumbsContainer>
        {dummyImages.map((_, index) => (
          <SliderThumbItem key={index} index={index} className="bg-transparent">
            <div className="size-full">
              <img
                src={dummyImages[index]}
                alt="promotion"
                className="object-cover object-center w-full h-full"
              />
            </div>
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
};

export default ProductCarousel;
