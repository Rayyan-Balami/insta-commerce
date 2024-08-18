import NoDataPlaceholder from "@/components/NoDataPlaceholder";
import PageTitle from "@/components/PageTitle";
import React from "react";
import CartProducts from "@/components/cart/CartProducts";

function Cart() {
  return (
    <>
      <NoDataPlaceholder
        header="No Products In Cart"
        body="Looks like you haven't added any products to your cart yet."
      />
      <PageTitle title="Your Cart" />
      <CartProducts />
    </>
  );
}

export default Cart;
