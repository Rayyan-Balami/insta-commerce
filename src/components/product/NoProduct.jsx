import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

function NoProduct() {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no products
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start selling as soon as you add a product.
        </p>
        <Button size="sm" className="mt-4 h-8">
          <Link to="/add-product" className="flex items-center gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            Add Product
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default NoProduct;
