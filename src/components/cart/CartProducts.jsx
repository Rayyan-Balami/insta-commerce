import React from "react";
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";

function CartProducts() {
  return (
    <div className="grid gap-4 xl:grid-cols-3 xl:gap-8">
      <div className="grid auto-rows-max gap-4 xl:col-span-2 xl:gap-8">
        <CartTable />
      </div>
      <div className="grid auto-rows-max gap-4 xl:gap-8">
        <CartSummary />
      </div>
    </div>
  );
}

export default CartProducts;
