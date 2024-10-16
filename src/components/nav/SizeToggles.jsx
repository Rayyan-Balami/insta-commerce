import { Scaling } from "lucide-react";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSelector } from "react-redux";

export default function SizeToggles({ className }) {
  const sizes = useSelector((state) => state.store.general.sizes) || [];
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className={className}>
      <p className="flex items-center gap-3 px-3 py-2 text-muted-foreground">
        <Scaling className="h-[1.15rem] w-[1.15rem]" />
        <span>Size</span>
      </p>
      {sizes && sizes.length > 0 && (
            <ToggleGroup
              type="multiple"
              variant="outline"
              className="justify-start flex-wrap px-3 py-2 gap-2"
              value={selectedSize}
              onValueChange={setSelectedSize}
            >
              {sizes.map((value, i) => (
                <ToggleGroupItem
                  key={i}
                  value={value}
                  aria-label={value}
                  className={`capitalize px-3 py-1 transition-colors duration-300 cursor-pointer ${
                    selectedSize.includes(value)
                      ? "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                      : " text-muted-foreground"
                  }`}
                >
                  {value}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}
    </div>
  );
}
