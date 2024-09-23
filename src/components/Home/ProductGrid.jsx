import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../product/ProductCard";
import SkeletonCard from "../product/SkeletonCard";

function ProductGrid({ products, loading }) {
  const [columns, setColumns] = useState(3); // Default number of columns
  const gridRef = useRef(null);

  useEffect(() => {
    const updateColumns = () => {
      if (gridRef.current) {
        const columnCount = window.getComputedStyle(gridRef.current)
          .gridTemplateColumns.split(' ').length;
        setColumns(Number(columnCount));
      }
    };

    // Initialize and observe grid size changes
    const resizeObserver = new ResizeObserver(updateColumns);
    if (gridRef.current) resizeObserver.observe(gridRef.current);

    // Cleanup on component unmount
    return () => {
      if (gridRef.current) resizeObserver.unobserve(gridRef.current);
    };
  }, []);

  const activeProducts = products.filter((product) => product.status === "active");

  return (
    <div
      ref={gridRef}
      className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-4 md:gap-8 h-fit"
    >
      {loading
        ? <SkeletonCard columns={columns} />
        : activeProducts.map((product) => (
            <ProductCard key={product.$id} product={product} />
          ))}
    </div>
  );
}

export default ProductGrid;
