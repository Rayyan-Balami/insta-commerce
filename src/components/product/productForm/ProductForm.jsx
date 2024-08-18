import React from "react";
import ProductDetails from "./ProductDetails";
import ProductSkus from "./ProductSkus";
import ProductCategoryAndStatus from "./ProductCategoryAndStatus";
import ProductMedia from "./ProductMedia";

function ProductForm() {
  return (
    <div className="grid gap-4 xl:grid-cols-3 xl:gap-8">
      <div className="grid auto-rows-max gap-4 xl:col-span-2 xl:gap-8">
        <ProductDetails />
        <ProductSkus />
        <ProductCategoryAndStatus />
      </div>
      <div className="grid auto-rows-max gap-4 xl:gap-8">
        <ProductMedia />
      </div>
    </div>
  );
}

export default ProductForm;
