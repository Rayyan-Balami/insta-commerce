import { useId, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";


function CategoriesCheckBoxes({ category }) {
  const [isChecked, setIsChecked] = useState(false);
  const id = useId();

  return (
    <li className="flex items-center gap-3 px-3 py-2">
      <Checkbox
        id={id}
        className={` ${
          isChecked ? "border-primary" : "border-muted-foreground"
        } transition-colors`}
        checked={isChecked}
        onCheckedChange={() => setIsChecked(!isChecked)}
      />
      <Label
        htmlFor={id}
        className={`capitalize transition-colors hover:text-primary ${
          isChecked ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {category}
      </Label>
    </li>
  );
}

export default CategoriesCheckBoxes;
