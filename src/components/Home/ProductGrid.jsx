import React from "react";
import ProductCard from "../product/ProductCard";
import SkeletonCard from "../product/SkeletonCard";

function ProductGrid({ products, loading }) {
  const activeProducts = products.filter((product) => product.status === "active");

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 h-fit">
      {loading
        ? <SkeletonCard columns={6} /> // Assuming a default column count for the skeleton
        : activeProducts.map((product) => (
            <ProductCard key={product.$id} product={product} />
          ))}
    </div>
  );
}

export default ProductGrid;