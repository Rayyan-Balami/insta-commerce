import {PlusCircle} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function ProductTableMenus() {
  return (
    <>
      <Button size="sm" className="h-8">
        <Link to="/add-product" className="flex items-center gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Add Product
        </Link>
      </Button>
    </>
  );
}

export default ProductTableMenus;
