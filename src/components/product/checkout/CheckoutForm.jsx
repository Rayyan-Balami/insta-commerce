import React from "react";
import CheckoutSummary from "./CheckoutSummary";
import GeneralInfo from "./GeneralInfo";
import ShippingInfo from "./ShippingInfo";
import PaymentAndDeliveryInfo from "./PaymentAndDeliveryInfo";

function CheckoutForm() {
  return (
    <div className="grid gap-4 xl:grid-cols-3 xl:gap-8">
      <div className="grid auto-rows-max gap-4 xl:col-span-2 xl:gap-8">
        <GeneralInfo />
        <ShippingInfo />
        <PaymentAndDeliveryInfo />
      </div>
      <div className="grid auto-rows-max gap-4 xl:gap-8">
        <CheckoutSummary />
      </div>
    </div>
  );
}

export default CheckoutForm;
