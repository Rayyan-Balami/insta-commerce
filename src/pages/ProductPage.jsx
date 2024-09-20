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
  Package,
  ArrowUpFromDot,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductCarousel from "@/components/product/productDetail/ProductCarousel";
import ProductVarientForm from "@/components/product/productDetail/ProductVarientForm";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import ProductGrid from "@/components/home/ProductGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
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
      .slice(0, 10); // Limit to the first 10 products
    setRelatedProducts(relatedProducts);
  };

  useEffect(() => {
    if (products.length === 0) return;

    const product = products.find((product) => product.$id === id);

    if (product) {
      setViewProduct(product);
      setSelectedVarient(product.skus[0]);
      window.scrollTo(0, 0); // Scroll to the top of the page
    } else {
      navigate(-1); // Redirect to the previous page
    }
  }, [id, products, navigate]);

  useEffect(() => {
    getRelatedProducts();
  }, [viewProduct]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCarouselInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = carouselRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [carouselRef.current]);

  // Update maxHeight when `isSeeMore` changes
  useEffect(() => {
    if (isSeeMore && descriptionRef.current) {
      // Set the maxHeight to the content's full height when expanded
      setMaxDescriptionHeight(`${descriptionRef.current.scrollHeight}px`);
    } else {
      // Collapse back to a default height (e.g., 50vh)
      setMaxDescriptionHeight("320px");
    }
  }, [isSeeMore]);

  if (!viewProduct) {
    return null; // Optionally, you can show a loading indicator or message here
  }

  return (
    <>
      <div id="top" className="flex flex-col lg:flex-row gap-8 scroll-m-20">
        <div className="flex-1 space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-xl md:text-2xl font-bold">
                {viewProduct.name}
              </h1>
              <p className="text-muted-foreground">
                Category: {viewProduct.category}
              </p>
            </div>
            {/* using anchor tag to scroll to the description section ( link didn't support) */}
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
              <Store className="size-[1.15rem]" />
              In-Store Pickup
            </Badge>
            <Badge variant="secondary" className="text-sm gap-2 py-1">
              <Truck className="size-[1.15rem]" />
              Express Shipping
            </Badge>
          </div>
          {/* Pricing and VAT details */}
          <div className="flex items-center gap-4">
            <h3 className="text-2xl md:text-3xl font-bold">
              Rs {selectedVarient.price || 0}
              <span className="text-sm italic text-muted-foreground line-through ml-2 font-medium">
                10000000
              </span>
            </h3>
            <p className="text-sm text-muted-foreground">Inclusive of VAT</p>
            {/* {selectedVarient.stock < 100 && (
              <Badge variant="outline" className="ml-auto text-sm gap-2 py-1">
                <Package className="size-[1.15rem]" />
                Low Stock
              </Badge>
            )} */}
          </div>
          {/* Promocode */}
          <Badge variant="secondary" className="text-sm gap-2 py-1">
            <TicketPercent className="size-[1.15rem]" />
            USE CODE: HUKUT500 FOR RS. 500 OFF
          </Badge>
          {/* Product variant form */}
          {viewProduct.skus && viewProduct.skus.length > 0 && (
            <ProductVarientForm
              allProducts={products}
              product={viewProduct}
              selectedVarient={selectedVarient}
              setSelectedVarient={setSelectedVarient}
            />
          )}
          {/* Delivery options (pickup and shipping) */}
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
            <AlertDescription className="flex h-5 items-center gap-4">
              <span>x Warranty </span>
              <Separator orientation="vertical" />
              <span>100% Genuine</span>
              <Separator orientation="vertical" />
              <span>Easy Returns</span>
              <Separator orientation="vertical" />
              <span>Express Delivery</span>
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Product description */}
      <div
        id="description"
        ref={descriptionRef}
        className={`relative mt-8 space-y-4 lg:space-y-6 scroll-m-20 rounded-md transition-all duration-300 ease-in-out overflow-clip`}
        style={{ maxHeight: maxDescriptionHeight }}
      >
        <h2 className="text-xl font-bold">Description</h2>
        <div>{parse(viewProduct.description)}</div>
        <div
          className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary-foreground to-transparent pointer-events-none transition-opacity duration-300 ${
            isSeeMore ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      {/* See more button */}
      { descriptionRef.current && descriptionRef.current.scrollHeight > 320 && (
      <Button
        variant="ghost"
        className={`w-full backdrop-blur-md transition-all duration-300`}
        onClick={() => setIsSeeMore(!isSeeMore)}
      >
        {isSeeMore ? "See Less" : "See More"}
      </Button>
      )}

      {/* Related products section */}
      <div className="mt-8 space-y-4 lg:space-y-6">
        <h2 className="text-xl font-bold">Related Products</h2>
        <ProductGrid products={relatedProducts} loading={false} />
      </div>

      {/* Scroll to top button */}
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
