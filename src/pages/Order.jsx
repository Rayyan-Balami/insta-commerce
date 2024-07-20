import OrderManagement from "@/components/order/OrderManagement";
import OrderTableMenus from "@/components/order/OrderTableMenus";
import PageTitle from "@/components/PageTitle";
import React from "react";

function Order() {
  return (
    <>
      <PageTitle title="Orders">
        <OrderTableMenus />
      </PageTitle>
      <OrderManagement />
    </>
  );
}

export default Order;
