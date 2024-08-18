import ProductGrid from "@/components/home/ProductGrid";
import PromotionCarousel from "@/components/home/PromotionCarousel";
import { getRandomWelcomeMessage } from "@/components/home/welcomeMesseges";
import NoDataPlaceholder from "@/components/NoDataPlaceholder";
import PageTitle from "@/components/PageTitle";
import React from "react";

function Home() {
  return (
    <>
      <PromotionCarousel />
      <NoDataPlaceholder
        header="Products Coming Soon"
        body="We are working on bringing you the best products. Stay tuned!"
      />
      <PageTitle title={getRandomWelcomeMessage()} />
    <ProductGrid />
    </>
  );
}

export default Home;
