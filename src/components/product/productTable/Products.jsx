import { useState } from "react";
import ProductTable from "./ProductTable";
import SkuSummary from "./SkuSummary";
import useProductWithPromotions from "@/hooks/useProductWithPromotions";

function Products() {

  const [viewProductID, setViewProductID] = useState(null);
  return (
    <div className="grid gap-4 xl:grid-cols-3 xl:gap-8">
      <div className="grid auto-rows-max gap-4 xl:col-span-2 xl:gap-8">
        <ProductTable setViewProductID={setViewProductID}/>
      </div>
      <div className="grid auto-rows-max gap-4 xl:gap-8">
        <SkuSummary viewProductID={viewProductID}/>
      </div>
    </div>
  );
}

export default Products;
