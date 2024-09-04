import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, Wallet, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function ProductVarientForm({ allProducts, product, selectedVarient, setSelectedVarient }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      color: selectedVarient.color,
      size: selectedVarient.size[0],
      quantity: 1,
    },
  });

  const sizes = selectedVarient.size || [];
  const colors = product.skus.map((sku) => sku.color);

  useEffect(() => {
    const currentColor = form.watch("color");
    const selectedSku = product.skus.find((sku) => sku.color === currentColor);
    if (selectedSku) {
      setSelectedVarient(selectedSku);
      form.setValue("size", selectedSku.size[0]);
    }
  }, [form.watch("color"), product.skus, setSelectedVarient]);
  

  const handleBuyNow = (e) => {
    e.preventDefault();
    //add item local storage with name buyNow , only one item can be added to buy now at a time 
    const size = form.getValues("size");
    const quantity = form.getValues("quantity");
    const item = {
      id: product.$id,
      quantity,
      sku: { ...selectedVarient, size },
      imagePreview: product.imagePreviews[0],
      name: product.name,
    };
    localStorage.setItem("buyNow", JSON.stringify(item));
    navigate("/checkout/buy-now");
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    const size = form.getValues("size");
    const quantity = form.getValues("quantity");
    console.log("sku", { ...selectedVarient, size });
  
    dispatch(
      addToCart({
        item: {
          id: product.$id,
          quantity,
          sku: { ...selectedVarient, size },
          isChecked: false,
        },
        products: allProducts,
      })
    );
    toast.success("Added to cart");
  };
  



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => {
        // Simulate asynchronous submission (e.g., API call)
        return new Promise((resolve) => setTimeout(resolve, 1000))
          .then(() => {
            console.log(data); // Handle form submission logic here
            form.reset();
          });
      })} className="grid gap-6">
        {/* Color Options */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  className="justify-start flex-wrap gap-2"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {colors.map((color) => (
                    <ToggleGroupItem
                      key={color}
                      value={color}
                      aria-label={color}
                      className={`px-3 py-1 transition-colors duration-300 cursor-pointer capitalize ${
                        field.value === color
                          ? "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {color}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Size Options */}
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  className="justify-start flex-wrap gap-2"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {sizes.map((size) => (
                    <ToggleGroupItem
                      key={size}
                      value={size}
                      aria-label={size}
                      className={`px-3 py-1 transition-colors duration-300 cursor-pointer uppercase ${
                        field.value === size
                          ? "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {size}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Quantity Options */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="p-1"
                  disabled={field.value <= 1}
                  onClick={() => field.onChange(Math.max(1, field.value - 1))}
                >
                  <MinusIcon className="w-4 h-4" />
                </Button>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    value={field.value}
                    onChange={(e) => {
                      const parsedValue = parseInt(e.target.value, 10);
                      field.onChange(isNaN(parsedValue) ? 1 : parsedValue);
                    }}
                    className="w-1/4 text-center"
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="p-1"
                  onClick={() => field.onChange(field.value + 1)}
                >
                  <PlusIcon className="w-4 h-4" />
                </Button>
              </div>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />

        {/* Buy Now and Add to Cart Buttons */}
        <div className="flex items-center gap-4">
          <Button type="button" className="w-full flex items-center gap-2"
          disabled={selectedVarient.stock === 0}
          onClick={handleBuyNow}>
              <Wallet className="size-4" />
              Buy Now
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={handleAddToCart}>
            <ShoppingCart className="size-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ProductVarientForm;
