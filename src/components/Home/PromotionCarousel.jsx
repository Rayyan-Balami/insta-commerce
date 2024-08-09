
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
    "https://as1.ftcdn.net/v2/jpg/04/93/72/36/1000_F_493723639_xHohaZMEdCZdz5bIeqduJb2FVzCVd2U2.jpg", // Placeholder image 1
    "https://as2.ftcdn.net/v2/jpg/06/38/74/91/1000_F_638749145_12xx25SNdpfgvHeTbQV6UTK7pcY2Eva2.jpg", // Placeholder image 2
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
        <CarouselMainContainer className="h-80">
          {dummyImages.map((_, index) => (
            <SliderMainItem key={index} className="bg-transparent p-0">
                <img
                  src={dummyImages[index]}
                  alt="promotion"
                  className="object-cover object-center w-full h-full"
                />
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
