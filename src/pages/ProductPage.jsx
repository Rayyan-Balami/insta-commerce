import React, { useEffect, useState } from "react";
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
  Package
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductCarousel from "@/components/product/productDetail/ProductCarousel";
import RelatedProductCarousel from "@/components/product/productDetail/RelatedProductCarousel";
import ProductVarientForm from "@/components/product/productDetail/ProductVarientForm";
import { useSelector } from "react-redux";

export default function ProductPage() {
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
  const { id } = useParams();
  const [viewProduct, setViewProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedVarient, setSelectedVarient] = useState({});

  const getRelatedProducts = () => {
    if (viewProduct) {
      const relatedProducts = products
        .filter((product) => product.category === viewProduct.category)
        .slice(0, 10); // Limit to the first 10 products
      setRelatedProducts(relatedProducts);
    }
  };

  useEffect(() => {
    if (products.length === 0) return;

    const product = products.find((product) => product.$id === id);

    if (product) {
      setViewProduct(product);
      setSelectedVarient(product.skus[0]);
      getRelatedProducts();
    } else {
      navigate(-1); // Redirect to the previous page
    }
  }, [id, products, navigate]);

  if (!viewProduct) {
    return null; // Optionally, you can show a loading indicator or message here
  }

  console.log("products", products);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{viewProduct.name}</h1>
              <p className="text-muted-foreground">Category: {viewProduct.category}</p>
            </div>
            {/* using anchor tag to scroll to the details section ( link didn't support) */}
            <a href="#details">
              <BadgeInfo className="size-5 cursor-pointer" />
            </a>
          </div>
          <ProductCarousel  product={viewProduct} />
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
            <h3 className="text-3xl font-bold">Rs {selectedVarient.price || 0}</h3>
            <p className="text-sm text-muted-foreground">Inclusive of VAT</p>
            {selectedVarient.stock < 100 && (
            <Badge variant="outline" className="ml-auto text-sm gap-2 py-1">
              <Package className="size-[1.15rem]" />
              Low Stock
            </Badge>
            )}
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
      {/* More to consider section */}
      <div id="details" className="my-8">details</div>
      <RelatedProductCarousel relatedProducts={relatedProducts} />
    </>
  );
}
