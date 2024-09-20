import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
    // Redirect to the product page
    navigate(`/view-product/${product.$id}`);
  };

  return (
    <Card
      className="overflow-hidden group flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleRedirect}
    >
      <div className="relative overflow-hidden aspect-square">
        {/* Default Image */}
        <img
          src={product.imagePreviews[0]}
          alt="Product Image"
          className={`size-full object-cover object-center transition-all duration-500 xl:group-hover:scale-105 ${
            hovered && product.imagePreviews[1] ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
        />
        {/* Hover Image */}
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
      </div>
      <CardContent className="flex-1 flex flex-col p-4 transition-background-color duration-300 ease-in-out xl:group-hover:bg-muted/40">
        <h3 className="text-lg font-semibold mb-3">{product.name}</h3>
        <div className="flex items-center gap-2 mb-4 mt-auto">
          <Badge
            variant="secondary"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            20% Off
          </Badge>
          <Badge
            variant="secondary"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {product.category}
          </Badge>
          <Badge className="text-primary-foreground">{product.skus.length} Variants</Badge>
        </div>
        <div className="flex items-center gap-4 justify-between">
          <div>
            <span className="text-xl font-semibold">
              Rs {product.skus[0].price}
            </span>
            <span className="text-xs italic text-muted-foreground line-through ml-2">
              10000000
            </span>
          </div>

          <Button variant="outline" size="sm" onClick={handleAddToCart}>
            <ShoppingCart className="h-3.5 w-3.5" />
            <span className="sr-only">Add to Cart</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
