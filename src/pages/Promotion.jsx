import React from "react";
import PageTitle from "@/components/PageTitle";
import PromoCard from "@/components/promotion/PromoCard";
import PromoTabs from "@/components/promotion/PromoTabs";

function Promotion() {
  return (
    <>
      <PageTitle title="Promotions" />
      <PromoTabs />
    </>
  );
}

export default Promotion;
