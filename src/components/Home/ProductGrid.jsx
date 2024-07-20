import React from "react";
import ProductCard from "../product/ProductCard";

function ProductGrid() {
  const products = [
    "https://i.pinimg.com/564x/11/f8/2e/11f82e1961f0bdc6c649ff4f60128556.jpg",
    "https://i.pinimg.com/564x/62/73/8c/62738cd68732ce66a331cf3e4c1fd265.jpg",
    "https://i.pinimg.com/736x/e6/91/8d/e6918dcf65a9aef1300b9831ddb354cd.jpg",
    "https://i.pinimg.com/564x/9b/bb/51/9bbb5139295fc7c0bc53e71d47ae42f0.jpg",
    "https://i.pinimg.com/564x/4a/55/ae/4a55ae9e989b3dbec47a38818190a069.jpg",
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
