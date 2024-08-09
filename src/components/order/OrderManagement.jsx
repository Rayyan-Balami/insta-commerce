import OrderTable from "./OrderTable";
import OrderSummary from "./OrderSummary";
import ProductTable from "../product/productTable/ProductTable";

export default function OrderManagement() {
  return (
    <div className="grid gap-4 xl:grid-cols-3 xl:gap-8">
      <div className="grid auto-rows-max gap-4 xl:col-span-2 xl:gap-8">
        <OrderTable />
      </div>
      <div className="grid auto-rows-max gap-4 xl:gap-8">
        <OrderSummary />
      </div>
    </div>
  );
}
