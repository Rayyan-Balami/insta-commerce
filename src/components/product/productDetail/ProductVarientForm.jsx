import React from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, Wallet, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import BuyNowForm from "../checkout/CheckoutForm";

function ProductVarientForm() {
  const [selectedSize, setSelectedSize] = useState("");
  const sizes = [
    { size: "free size", label: "Free Size" },
    { size: "small", label: "S" },
    { size: "medium", label: "M" },
    { size: "large", label: "L" },
    { size: "extra-large", label: "XL" },
    { size: "2x-large", label: "XXL" },
  ];
  const [selectedColor, setSelectedColor] = useState("");
  const colors = [
    "Red","Blue","Green","Yellow","Black","White","Grey","Brown","Pink","Purple"
  ];
  return (
    <>
      {/* //color options */}
      <div>
        <h2 className="font-semibold mb-2">Colors</h2>
        <ToggleGroup
          type="single"
          variant="outline"
          className="justify-start flex-wrap gap-2"
          value={selectedColor}
          onValueChange={setSelectedColor}
        >
          {colors.map((color) => (
            <ToggleGroupItem
              key={color} // Adding a unique key
              value={color}
              aria-label={color}
              className={`px-3 py-1 transition-colors duration-300 cursor-pointer ${
                selectedColor.includes(color)
                  ? "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  : " text-muted-foreground"
              }`}
            >
              {color}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      {/* //size options */}
      <div>
        <h2 className="font-semibold mb-2">Size</h2>
        <ToggleGroup
          type="single"
          variant="outline"
          className="justify-start flex-wrap gap-2"
          value={selectedSize}
          onValueChange={setSelectedSize}
        >
          {sizes.map(({ size, label }) => (
            <ToggleGroupItem
              key={size} // Adding a unique key
              value={label}
              aria-label={size}
              className={`px-3 py-1 transition-colors duration-300 cursor-pointer ${
                selectedSize.includes(label)
                  ? "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  : " text-muted-foreground"
              }`}
            >
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      {/* //quantity options */}
      <div>
        <h2 className="font-semibold mb-2">Quantity</h2>
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
        <BuyNowForm />
      </div>
    </>
  );
}

export default ProductVarientForm;
