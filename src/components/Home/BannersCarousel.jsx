import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { useSelector } from "react-redux";

const BannersCarousel = () => {
  const loading = useSelector((state) => state.promotion.loading);
  const banners = useSelector((state) => state.promotion.promotions.banners) || [];

  if (loading) {
    return <Skeleton className="aspect-[2.76/1] border" />;
  }

  if (!banners.length) {
    return null;
  }

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
        <CarouselMainContainer className="aspect-[2.76/1]">
          {banners.map((banner, index) => (
            <SliderMainItem key={index} className="bg-transparent p-0">
              <img
                src={banner.preview}
                alt="Banner Image"
                className="object-cover object-center w-full h-full aspect-[2.76/1]"
              />
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <CarouselThumbsContainer className="gap-x-1 bg-muted/30 backdrop-blur p-1 rounded-full">
            {banners.map((_, index) => (
              <CarouselIndicator key={index} index={index} />
            ))}
          </CarouselThumbsContainer>
        </div>
      </div>
    </Carousel>
  );
};

export default BannersCarousel;