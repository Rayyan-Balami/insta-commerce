import { Scaling } from "lucide-react";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { sizes } from "@/schemas/general";

export default function SizeToggles({ className }) {
  const [selectedSize, setSelectedSize] = useState("");

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
        {sizes.map(({ size, label },i) => (
          <ToggleGroupItem
            key={i}
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
