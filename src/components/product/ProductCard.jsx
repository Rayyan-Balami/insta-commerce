import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { toast } from "sonner";

// addToCart: (state, action) => {
//   const item = action.payload;
//   const existingItem = state.cartItems.find((i) => i.id === item.id);
//   if (existingItem) {
//     existingItem.quantity += item.quantity;
//   } else {
//     state.cartItems.push(item);
//   }
//   localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
// },

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        id: product.$id,
        quantity: 1,
        sku: product.skus[0],
        checked: false,
      })
    );
    toast.success("Added to cart");
  };

  return (
    <Link to={`/view-product/${product.id}`} className="h-fit">
      <Card className="overflow-hidden group">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.imagePreviews[0]}
            alt="Product Image"
            className="size-full object-cover object-center xl:group-hover:scale-105 transition-all duration-300"
          />
        </div>
        <CardContent className="p-4 space-y-4 xl:group-hover:bg-muted/40 transition-all duration-300">
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <div className="flex items-center gap-2 mt-3">
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
              <Badge className="text-white">
                {product.skus.length} Varients
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <div>
              <span className="text-lg font-semibold">{product.skus[0].price}</span>
              <span className="text-xs text-muted-foreground line-through ml-2">
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
    </Link>
  );
}