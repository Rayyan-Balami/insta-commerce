import React from "react";
import ProductCard from "../product/ProductCard";

function ProductGrid({ products }) {
  // Filter out products that are not active
  const activeProducts = products.filter((product) => product.status === "active");

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {activeProducts.map((product) => (
        <ProductCard key={product.$id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
