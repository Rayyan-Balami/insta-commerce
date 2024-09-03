import { Scaling } from "lucide-react";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function SizeToggles({ className }) {
  const [selectedSize, setSelectedSize] = useState("");
  const sizes = [
    { size: "free size", label: "Free Size" },
    { size: "small", label: "S" },
    { size: "medium", label: "M" },
    { size: "large", label: "L" },
    { size: "extra-large", label: "XL" },
    { size: "2x-large", label: "XXL" },
  ];

  return (
    <div className={className}>
      <p className="flex items-center gap-3 px-3 py-2 text-muted-foreground">
        <Scaling className="h-[1.15rem] w-[1.15rem]" />
        <span>Size</span>
      </p>
      <ToggleGroup
        type="multiple"
        variant="outline"
        className="justify-start flex-wrap px-3 py-2 gap-2"
        value={selectedSize}
        onValueChange={setSelectedSize}
      >
        {sizes.map(({ size, label }) => (
          <ToggleGroupItem
            key={size}  // Adding a unique key
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
  );
}
