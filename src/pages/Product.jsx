import PageTitle from "@/components/PageTitle";
import NoDataPlaceholder from "@/components/NoDataPlaceholder";
import ProductTableMenus from "@/components/product/productTable/ProductTableMenus";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import Products from "@/components/product/productTable/Products";
import { useSelector } from "react-redux";
import useProductWithPromotions from "@/hooks/useProductWithPromotions";

function Product() {
  const loading = useSelector((state) => state.product.loading);
  const products = useProductWithPromotions();

  if (!loading && (!products || products.length === 0)) {
    return (
      <NoDataPlaceholder
        header="No Products Found"
        body="Create a new product to get started"
      >
        <Button size="sm" className="h-8" asChild>
          <Link to="/add-product" className="flex items-center gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            Add Product
          </Link>
        </Button>
      </NoDataPlaceholder>
    );
  }

  return (
    <>
      <PageTitle title="Products">
        <ProductTableMenus />
      </PageTitle>
      <Products />
    </>
  );
}

export default Product;