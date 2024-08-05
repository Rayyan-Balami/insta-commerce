import React from "react";
import ProductDetails from "./ProductDetails";
import ProductStocks from "./ProductStocks";
import ProductCategory from "./ProductCategory";
import ProductStatus from "./ProductStatus";
import ProductImages from "./ProductImages";


function ProductForm() {
 

  return (

    <div className="grid gap-4 xl:grid-cols-3 xl:gap-8">
      <div className="grid auto-rows-max gap-4 xl:col-span-2 xl:gap-8">
        <ProductDetails />
        <ProductStocks />
        <ProductCategory />
      </div>
      <div className="grid auto-rows-max gap-4 xl:gap-8">
      <ProductStatus />
      <ProductImages />
      </div>
    </div>
   
  );
}

export default ProductForm;
