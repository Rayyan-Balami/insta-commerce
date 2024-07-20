import PageTitle from "@/components/PageTitle";
import NoProduct from "@/components/product/NoProduct";
import ProductTable from "@/components/product/productTable/ProductTable";
import ProductTableMenus from "@/components/product/productTable/ProductTableMenus";

function Product() {
  return (
    <>
      <PageTitle title="Products">
        <ProductTableMenus />
      </PageTitle>
      <NoProduct />
      <ProductTable/>
    </>
  );
}

export default Product;
