import React from "react";
import ProductTable from "./ProductTable";
import SkuSummary from "./SkuSummary";

function Products() {
  return (
    <div className="grid gap-4 xl:grid-cols-3 xl:gap-8">
      <div className="grid auto-rows-max gap-4 xl:col-span-2 xl:gap-8">
        <ProductTable />
      </div>
      <div className="grid auto-rows-max gap-4 xl:gap-8">
        <SkuSummary />
      </div>
    </div>
  );
}

export default Products;
