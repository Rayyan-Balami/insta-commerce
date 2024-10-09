import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, TicketPercent } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const calculateDiscountedPrice = (product, originalPrice) => {
  const { discount } = product;
  if (!discount) return null;

  const { discountRate, maximumDiscountAmount, minimumPurchaseAmount } = discount;
  let discountAmt = originalPrice * (discountRate / 100);

  if (maximumDiscountAmount === 0) {
    return (originalPrice - discountAmt).toFixed(2);
  }

  if (discountAmt > maximumDiscountAmount) {
    discountAmt = maximumDiscountAmount;
  }

  if (minimumPurchaseAmount === 0 || originalPrice >= minimumPurchaseAmount) {
    return (originalPrice - discountAmt).toFixed(2);
  }

  return null;
};

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        item: {
          id: product.$id,
          quantity: 1,
          sku: { ...product.skus[0], size: product.skus[0].size[0] },
          isChecked: false,
        },
        products,
      })
    );
    toast.success("Added to cart");
  };

  const handleRedirect = () => {
    navigate(`/view-product/${product.$id}`);
  };

  const discountedPrice = calculateDiscountedPrice(product, product.skus[0].price);
  const originalPrice = product.skus[0].price.toFixed(2);
  const [integerPart, decimalPart] = originalPrice.split(".");

  return (
    <Card
      className="overflow-hidden group flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleRedirect}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.imagePreviews[0]}
          alt="Product Image"
          className={`size-full object-cover object-center transition-all duration-500 xl:group-hover:scale-105 ${
            hovered && product.imagePreviews[1] ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
        />
        {product.imagePreviews[1] && (
          <img
            src={product.imagePreviews[1]}
            alt="Product Image"
            className={`size-full object-cover object-center absolute inset-0 transition-all duration-500 xl:group-hover:scale-105 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        )}
        <div className="absolute bottom-1 left-2">
          {product.promoCode && (
            <Badge
              variant="secondary"
              className="border border-primary/10 gap-2 uppercase rounded-md"
            >
              <TicketPercent className="size-[1.15rem]" />
              {product.promoCode.code}
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="flex-1 flex flex-col p-4 xl:group-hover:bg-muted/40 transition-all duration-300">
        <div className="text-xs mb-1.5 capitalize text-muted-foreground flex items-center gap-2 justify-between">
          <p>{product.category}</p>
          <p>{product.skus.length} Variants</p>
        </div>
        <h3 className="text-lg font-semibold mb-2.5">{product.name}</h3>
        <div className="flex items-center gap-4 justify-between mt-auto">
          <div className="flex flex-col gap-0.5">
            {discountedPrice !== null && (
              <span className="text-xs font-semibold italic text-muted-foreground line-through">
                Rs {integerPart}
                <span className="font-normal">.{decimalPart}</span>
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">
                {discountedPrice !== null ? (
                  discountedPrice === 0 ? (
                    "Free"
                  ) : (
                    <>
                      Rs {Math.floor(discountedPrice)}
                      <span className="text-sm font-normal">
                        .{discountedPrice.split(".")[1]}
                      </span>
                    </>
                  )
                ) : (
                  <>
                    Rs {integerPart}
                    <span className="text-sm font-normal">.{decimalPart}</span>
                  </>
                )}
              </span>
              {product.discount && (
                <Badge variant="secondary" className="border border-primary/10">
                  - {product.discount.discountRate}%
                </Badge>
              )}
            </div>
          </div>

          <Button variant="outline" size="icon" className="rounded-full" onClick={handleAddToCart}>
            <ShoppingBag className="size-5" />
            <span className="sr-only">Add to Cart</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}