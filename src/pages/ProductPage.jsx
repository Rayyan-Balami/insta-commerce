/**
 * v0 by Vercel.
 * @see https://v0.dev/t/83XrnESoZLk
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Truck,
  PackageOpen,
  Wallet,
  ShoppingCart,
  HeartHandshake,
  TicketPercent,
  MinusIcon,
  PlusIcon,
  BadgeInfo,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import ProductCarousel from "@/components/product/productDetail/ProductCarousel";

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
              <StoreIcon className="size-[1.15rem]" />
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
          {/* //size options */}
          <div>
            <h2 className="font-bold">Size</h2>
            <Select>
              <SelectTrigger id="variant">
                <SelectValue placeholder="8/256GB" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8/256GB">8/256GB</SelectItem>
                <SelectItem value="12/512GB">12/512GB</SelectItem>
              </SelectContent>
            </Select>
            <h2 className="font-bold">Colors</h2>
            <div className="flex gap-4 mt-2">
              <Button variant="outline" className="w-20 h-20">
                Green
              </Button>
              <Button variant="outline" className="w-20 h-20">
                Gold
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <h2 className="font-bold">Quantity</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="p-1">
                <MinusIcon className="w-4 h-4" />
              </Button>
              <Input
                type="number"
                min="1"
                max="5"
                defaultValue="1"
                className="w-1/4 text-center"
              />
              <Button variant="outline" size="icon" className="p-1">
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* //buy now and add to cart buttons  */}
          <div className="flex items-center gap-4">
            <Button className="w-full">
              <Wallet className="size-4 mr-2" />
              Buy Now
            </Button>
            <Button variant="outline" className="w-full">
              <ShoppingCart className="size-4 mr-2" />
              Add to Cart
            </Button>
          </div>

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
      <div id="details">details</div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">More To Consider (10 Items)</h2>
        <div className="flex gap-4 mt-4 overflow-x-auto">
          <div className="flex-shrink-0 w-48">
            <img
              src="/placeholder.svg"
              alt="Product 1"
              className="w-full h-auto"
              width="100"
              height="100"
              style={{ aspectRatio: "100/100", objectFit: "cover" }}
            />
            <p>Realme C61 (4/64GB)</p>
            <p>₹13,499</p>
          </div>
          <div className="flex-shrink-0 w-48">
            <img
              src="/placeholder.svg"
              alt="Product 2"
              className="w-full h-auto"
              width="100"
              height="100"
              style={{ aspectRatio: "100/100", objectFit: "cover" }}
            />
            <p>Realme C63</p>
            <p>₹15,999</p>
          </div>
          <div className="flex-shrink-0 w-48">
            <img
              src="/placeholder.svg"
              alt="Product 3"
              className="w-full h-auto"
              width="100"
              height="100"
              style={{ aspectRatio: "100/100", objectFit: "cover" }}
            />
            <p>Realme Narzo N65 5G</p>
            <p>₹21,999</p>
          </div>
          <div className="flex-shrink-0 w-48">
            <img
              src="/placeholder.svg"
              alt="Product 4"
              className="w-full h-auto"
              width="100"
              height="100"
              style={{ aspectRatio: "100/100", objectFit: "cover" }}
            />
            <p>Honor 200</p>
            <p>₹64,999</p>
          </div>
        </div>
      </div>
    </>
  );
}

function GemIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12l4 6-10 13L2 9Z" />
      <path d="M11 3 8 9l4 13 4-13-3-6" />
      <path d="M2 9h20" />
    </svg>
  );
}

function PackagePlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 16h6" />
      <path d="M19 13v6" />
      <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
      <path d="m7.5 4.27 9 5.15" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </svg>
  );
}

function ShipIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
      <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
      <path d="M12 10v4" />
      <path d="M12 2v3" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function StoreIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  );
}

function WrenchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
