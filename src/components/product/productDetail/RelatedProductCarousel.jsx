import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
} from "@/components/ui/carousel";
import ProductCard from "../ProductCard";

const RelatedProductCarousel = () => {
  return (
    <Carousel className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold">More To Consider</h2>
        <div className="space-x-4">
          <CarouselPrevious className="relative inset-0 translate-y-0 size-8 *:size-5" />
          <CarouselNext className="relative inset-0 translate-y-0 size-8 *:size-5" />
        </div>
      </div>

      <CarouselMainContainer className="gap-4 h-fit">
        {Array.from({ length: 5 }).map((_, index) => (
          <SliderMainItem key={index} className="bg-transparent sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 max-w-sm" orientation="horizontal">
            {/* <ProductCard/> */}
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
      {/* //need for next and previous buttons */}
      <CarouselThumbsContainer />
    </Carousel>
  );
};

export default RelatedProductCarousel;
