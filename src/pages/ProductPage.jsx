/**
 * v0 by Vercel.
 * @see https://v0.dev/t/83XrnESoZLk
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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
} from "lucide-react";
import { Link } from "react-router-dom";
import ProductCarousel from "@/components/product/productDetail/ProductCarousel";
import RelatedProductCarousel from "@/components/product/productDetail/RelatedProductCarousel";
import ProductVarientForm from "@/components/product/productDetail/ProductVarientForm";

export default function ProductPage() {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Hand Knit Sweater</h1>
              <p className="text-muted-foreground">Categoty: T-shirts</p>
            </div>
            {/* using anchor tag to scroll to the details section ( link didnt supported) */}
            <a href="#details">
              <BadgeInfo className="size-5 cursor-pointer" />
            </a>
          </div>
          <ProductCarousel />
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
          {/* //pricing and vat details */}
          <div className="flex items-center gap-4">
            <h3 className="text-3xl font-bold">Rs 34,000</h3>
            <p className="text-sm text-muted-foreground">Inclusive of VAT</p>
          </div>
          {/* //promocode */}
          <Badge variant="secondary" className="text-sm gap-2 py-1">
            <TicketPercent className="size-[1.15rem]" />
            USE CODE: HUKUT500 FOR RS. 500 OFF
          </Badge>
          <ProductVarientForm/>
          {/* //Delivery options (pickup and shipping) note: add a link to the pickup location  */}
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
            <AlertTitle>Store Promices</AlertTitle>
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
      {/* //more to consider section  */}
      <div id="details" className="my-8">details</div>
      <RelatedProductCarousel />
      {/* <div className="mt-8">
        <h2 className="text-xl font-bold">More To Consider (10 Items)</h2>
        <div className="flex gap-4 mt-4 overflow-x-auto *:shrink-0">
          <ProductCard/>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div> */}
    </>
  );
}