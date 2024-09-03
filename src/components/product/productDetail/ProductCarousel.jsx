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

const ProductCarousel = ({ product }) => {
  console.log(product.video);
  //video link can be of two types, youtubeVidLink or youtubeShortLink
  //vidlink format: https://youtu.be/jt5bqO_r2DQ?si=13w11PqgLiRVszg0
  //shortlink format: https://youtube.com/shorts/SD8WJ7O1Q5M?si=uRPDzghnmea9f6uy
  //extracting video id from the link
  const extractYouTubeId = (url) => {
    const videoIdPatterns = [
      /youtu\.be\/([^?&]+)/, // Short video link: https://youtu.be/{id}
      /youtube\.com\/(?:watch\?v=|shorts\/)([^&?]+)/, // Full video link: https://youtube.com/watch?v={id} or https://youtube.com/shorts/{id}
    ];

    for (const pattern of videoIdPatterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null; // No video ID found
  };

  const videoId = extractYouTubeId(product.video || "");

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

        <div className="relative border rounded-md overflow-hidden h-fit">
          <CarouselMainContainer className="aspect-square">
            {product.imagePreviews.map((preview, index) => (
              <SliderMainItem key={index} className="bg-transparent p-0">
                <img
                  src={preview}
                  alt="product image"
                  className="object-cover object-center w-full h-full"
                />
              </SliderMainItem>
            ))}
          </CarouselMainContainer>
          {/* //YT video preview */}

          {product.video && (
            <Drawer>
              <DrawerTrigger
                className="group absolute bottom-2 right-2 w-28 hover:w-48 transition-all aspect-video
             shadow-md rounded-md overflow-hidden"
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="Video Preview"
                  className="size-full object-cover object-center
                  brightness-75 group-hover:brightness-100 transition-all duration-300
                  "
                />
                <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white group-hover:animate-pulse" />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="text-center">
                    Video Preview
                  </DrawerTitle>
                </DrawerHeader>
                <DrawerDescription className="px-4">
                  <iframe
                    className="w-full max-w-screen-sm mx-auto aspect-video border-none rounded-lg"
                    src={`https://www.youtube.com/embed/${videoId}`}
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
          )}
        </div>
      </div>
      <CarouselThumbsContainer>
        {product.imagePreviews.map((preview, index) => (
          <SliderThumbItem
            key={index}
            index={index}
            className="bg-transparent basis-1/4 max-w-sm "
          >
            <img
              src={preview}
              alt="promotion"
              className="object-cover object-center w-full h-full aspect-square"
            />
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
};

export default ProductCarousel;
