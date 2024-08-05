import NoDataPlaceholder from "@/components/NoDataPlaceholder";
import OrderManagement from "@/components/order/OrderManagement";
import OrderTableMenus from "@/components/order/OrderTableMenus";
import PageTitle from "@/components/PageTitle";
import React from "react";

function Order() {
  return (
    <>
      <NoDataPlaceholder
        header="No Orders Yet"
        body="Once you have orders, you'll see them here."
      />
      <PageTitle title="Orders">
        <OrderTableMenus />
      </PageTitle>
      <OrderManagement />
    </>
  );
}

export default Order;
