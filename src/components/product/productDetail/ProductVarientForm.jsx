import React from "react";
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
import { Link } from "react-router-dom";

function ProductVarientForm() {
  const form = useForm({
    defaultValues: {
      color: "",
      size: "",
      quantity: 1,
    },
  });
  const onSubmit = async (data) => {
    // Simulate asynchronous submission (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data); // Handle form submission logic here
    //reset the form
    form.reset();
  };
  const sizes = [
    { value: "free size", label: "Free Size" },
    { value: "small", label: "S" },
    { value: "medium", label: "M" },
    { value: "large", label: "L" },
    { value: "extra-large", label: "XL" },
    { value: "2x-large", label: "XXL" },
  ];
  const colors = [
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
  ];
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {/* //color options */}
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color </FormLabel>
                <FormControl>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    className="justify-start flex-wrap gap-2"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {colors.map(({ value, label }) => (
                      <ToggleGroupItem
                        key={value}
                        value={value}
                        aria-label={value}
                        className={`px-3 py-1 transition-colors duration-300 cursor-pointer ${
                          form.watch("color") === value
                            ? "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                            : " text-muted-foreground"
                        }`}
                      >
                        {label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {/* //size options */}
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size </FormLabel>
                <FormControl>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    className="justify-start flex-wrap gap-2"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {sizes.map(({ value, label }) => (
                      <ToggleGroupItem
                        key={value}
                        value={value}
                        aria-label={value}
                        className={`px-3 py-1 transition-colors duration-300 cursor-pointer ${
                          form.watch("size") === value
                            ? "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                            : " text-muted-foreground"
                        }`}
                      >
                        {label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FormControl>
              </FormItem>
            )}
          />
          {/* //quantity options */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity </FormLabel>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="p-1"
                    disabled={field.value <= 1}
                    onClick={() => {
                      if (field.value > 1) {
                        field.onChange(field.value - 1);
                      }
                    }}
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
                        if (!isNaN(parsedValue)) {
                          field.onChange(parsedValue);
                        } else {
                          field.onChange(1);
                        }
                      }}
                      className="w-1/4 text-center"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="p-1"
                    onClick={() => {
                      field.onChange(field.value + 1);
                    }}
                  >
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                </div>
                <FormMessage className="font-light" />
              </FormItem>
            )}
          />

          {/* //buy now and add to cart buttons  */}
          <div className="flex items-center gap-4">
            <Button className="w-full" asChild>
              <Link to="/checkout/buy-now" className="flex items-center gap-2">
                <Wallet className="size-4" />
                Buy Now
              </Link>
            </Button>
            <Button variant="outline" className="w-full">
              <ShoppingCart className="size-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default ProductVarientForm;
