import { ClipboardX, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function ProductFormMenus() {
  return (
    <>
      <Button size="sm" variant="outline" className="h-8 gap-1">
        <ClipboardX className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Discard
        </span>
      </Button>
      <Button size="sm" className="h-8 gap-1">
        <PlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Add Product
        </span>
      </Button>
    </>
  );
}

export default ProductFormMenus;
