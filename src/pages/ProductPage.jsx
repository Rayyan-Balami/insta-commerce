import React, { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Truck,
  PackageOpen,
  HeartHandshake,
  TicketPercent,
  BadgeInfo,
  Store,
  ArrowUpFromDot,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductCarousel from "@/components/product/productDetail/ProductCarousel";
import ProductVarientForm from "@/components/product/productDetail/ProductVarientForm";
import parse from "html-react-parser";
import ProductGrid from "@/components/home/ProductGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useProductWithPromotions from "@/hooks/useProductWithPromotions";
import { calculateDiscountedPrice } from "@/components/product/ProductCard";

export default function ProductPage() {
  const navigate = useNavigate();
  const products = useProductWithPromotions();
  const { id } = useParams();
  const [viewProduct, setViewProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedVarient, setSelectedVarient] = useState({});
  const [isCarouselInView, setIsCarouselInView] = useState(true);
  const carouselRef = useRef(null);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const descriptionRef = useRef(null);
  const [maxDescriptionHeight, setMaxDescriptionHeight] = useState("0px");

  const getRelatedProducts = () => {
    if (!viewProduct) return;
    const relatedProducts = products
      .filter(
        (product) =>
          product.category === viewProduct.category && product.$id !== id
      )
      .slice(0, 10);
    setRelatedProducts(relatedProducts);
  };

  useEffect(() => {
    if (products.length === 0) return;
    const product = products.find((product) => product.$id === id);
    if (product) {
      setViewProduct(product);
      setSelectedVarient(product.skus[0]);
      window.scrollTo(0, 0);
    } else {
      navigate(-1);
    }
  }, [id, products, navigate]);

  useEffect(() => {
    getRelatedProducts();
  }, [viewProduct]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsCarouselInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    const currentRef = carouselRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => currentRef && observer.unobserve(currentRef);
  }, [carouselRef.current]);

  useEffect(() => {
    if (isSeeMore && descriptionRef.current) {
      setMaxDescriptionHeight(`${descriptionRef.current.scrollHeight}px`);
    } else {
      setMaxDescriptionHeight("320px");
    }
  }, [isSeeMore]);

  if (!viewProduct) return null;

  const discountedPrice = calculateDiscountedPrice(
    viewProduct,
    selectedVarient.price
  );
  const originalPrice = selectedVarient.price.toFixed(2);
  const [integerPart, decimalPart] = originalPrice.split(".");

  return (
    <>
      <div id="top" className="flex flex-col lg:flex-row gap-8 scroll-m-20">
        <div className="flex-1 space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-xl md:text-2xl font-semibold">
                {viewProduct.name}
              </h1>
              <p className="text-muted-foreground">
                Category: {viewProduct.category}
              </p>
            </div>
            <a href="#description">
              <BadgeInfo className="size-5 cursor-pointer" />
            </a>
          </div>
          <div ref={carouselRef}>
            <ProductCarousel product={viewProduct} />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm gap-2 py-1">
              <Store className="size-4" />
              In-Store Pickup
            </Badge>
            <Badge variant="secondary" className="text-sm gap-2 py-1">
              <Truck className="size-[1.15rem]" />
              Express Shipping
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <h3 className="text-2xl md:text-3xl font-semibold">
              {discountedPrice !== null && discountedPrice === 0 ? (
                "Free"
              ) : discountedPrice !== null ? (
                <>
                  Rs {Math.floor(discountedPrice)}
                  <span className="text-lg md:text-xl font-normal">
                    .{discountedPrice.split(".")[1]}
                  </span>
                </>
              ) : (
                <>
                  Rs {integerPart}
                  <span className="text-lg md:text-xl font-normal">
                    .{decimalPart}
                  </span>
                </>
              )}
            </h3>
            {discountedPrice !== null && (
              <div className="flex gap-2 items-end">
                <span className="text-xs md:text-sm italic text-muted-foreground ml-2 font-medium line-through">
                  Rs {integerPart}
                  <span className="font-normal">.{decimalPart}</span>
                </span>
                {viewProduct.discount && (
                  <Badge
                    variant="secondary"
                    className="border border-primary/10"
                  >
                    - {viewProduct.discount.discountRate}%
                  </Badge>
                )}
              </div>
            )}
          </div>
          {viewProduct.promoCode && (
          <Badge variant="secondary" className="rounded-md items-start text-sm gap-2 py-1 uppercase">
            <TicketPercent className="size-4 mt-0.5" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                use code :
                <Badge
                  variant="secondary"
                  className="bg-background hover:bg-background border border-primary/10"
                >
                  {viewProduct.promoCode.code}
                </Badge>
                FOR
                <Badge
                  variant="secondary"
                  className="bg-background hover:bg-background border border-primary/10"
                >
                  {viewProduct.promoCode.discountType === "percentage"
                    ? ` ${viewProduct.promoCode.discountValue}%`
                    : ` Rs ${viewProduct.promoCode.discountValue}`}
                </Badge>
                off
              </div>
              {viewProduct.promoCode.maximumDiscountAmount > 0 && (
              <div>
                <span className="text-xs italic opacity-70">
                up to : Rs {viewProduct.promoCode.maximumDiscountAmount}
                </span>
              </div>
              )}
            </div>
          </Badge>
          )}
          {viewProduct.skus && viewProduct.skus.length > 0 && (
            <ProductVarientForm
              allProducts={products}
              product={viewProduct}
              selectedVarient={selectedVarient}
              setSelectedVarient={setSelectedVarient}
            />
          )}
          <Alert>
            <PackageOpen className="h-4 w-4" />
            <AlertTitle>Delivery Options Available</AlertTitle>
            <AlertDescription className="mt-2">
              Pickup:{" "}
              <Link to="/store" className="text-blue-500">
                Available Today at Hukut Store
              </Link>
            </AlertDescription>
            <AlertDescription className="mt-2">
              Express Shipping: Free / Charges Apply
            </AlertDescription>
          </Alert>
          <Alert>
            <HeartHandshake className="h-4 w-4" />
            <AlertTitle>Store Promises</AlertTitle>
            <AlertDescription className="mt-2">
              We are committed to providing you with the best products and
              services.
            </AlertDescription>
            <Separator className="my-4" />
            <AlertDescription className="flex flex-wrap justify-between gap-4">
              <span>x Warranty </span>
              <span>100% Genuine</span>
              <span>Easy Returns</span>
              <span>Express Delivery</span>
            </AlertDescription>
          </Alert>
        </div>
      </div>
      <div
        id="description"
        ref={descriptionRef}
        className="relative mt-8 space-y-4 lg:space-y-6 scroll-m-20 rounded-md transition-all duration-300 ease-in-out overflow-clip"
        style={{ maxHeight: maxDescriptionHeight }}
      >
        <h2 className="text-xl font-bold">Description</h2>
        <div>{parse(viewProduct.description)}</div>
        {descriptionRef.current &&
          descriptionRef.current.scrollHeight > 320 && (
            <div
              className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary-foreground to-transparent pointer-events-none transition-opacity duration-300 ${
                isSeeMore ? "opacity-0" : "opacity-100"
              }`}
            />
          )}
      </div>
      {descriptionRef.current && descriptionRef.current.scrollHeight > 320 && (
        <Button
          variant="ghost"
          className="w-full backdrop-blur-md transition-all duration-300"
          onClick={() => setIsSeeMore(!isSeeMore)}
        >
          {isSeeMore ? "See Less" : "See More"}
        </Button>
      )}
      {relatedProducts.length > 0 && (
      <div className="mt-8 space-y-4 lg:space-y-6">
        <h2 className="text-xl font-bold">Related Products</h2>
        <ProductGrid products={relatedProducts} loading={false} />
      </div>
      )}
      <a href="#top">
        <Card
          className={`fixed top-20 right-4 bg-muted/80 backdrop-blur-sm shadow-lg transition-opacity duration-300 ${
            isCarouselInView ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <CardContent className="relative p-1 size-20">
            <img
              src={viewProduct.imagePreviews[0]}
              alt={viewProduct.name}
              className="object-cover object-center w-full h-full aspect-square rounded-md"
            />
            <div className="absolute -top-2 -right-2 p-1 bg-muted rounded-full animate-bounce">
              <ArrowUpFromDot className="size-3.5" />
            </div>
          </CardContent>
        </Card>
      </a>
    </>
  );
}