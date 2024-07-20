import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function CategoriesCheckBoxes({ category }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <li className="max-md:mx-[-0.65rem] flex items-center gap-3 rounded-lg px-3 py-2">
      <Checkbox
        id={category}
        className={` ${
          isChecked ? "border-primary" : "border-muted-foreground"
        } transition-colors`}
        checked={isChecked}
        onCheckedChange={() => setIsChecked(!isChecked)}
      />
      <Label
        htmlFor={category}
        className={`transition-colors hover:text-primary ${
          isChecked ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {category}
      </Label>
    </li>
  );
}

export default CategoriesCheckBoxes;
