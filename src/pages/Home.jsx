import ProductGrid from "@/components/home/ProductGrid";
import PromotionCarousel from "@/components/home/PromotionCarousel";
import { getRandomWelcomeMessage } from "@/components/home/welcomeMesseges";
import Loader from "@/components/Loader";
import NoDataPlaceholder from "@/components/NoDataPlaceholder";
import PageTitle from "@/components/PageTitle";
import React from "react";
import { useSelector } from "react-redux";

function Home() {
  let {loading, products } = useSelector((state) => state.product);

  return (
    <>
      <PromotionCarousel />
      {loading && <Loader />}

      {!loading && (!products || products.length === 0) && (
        <NoDataPlaceholder
          header="Products Coming Soon"
          body="We are working on bringing you the best products. Stay tuned!"
        />
      )}

      {!loading && products && products.length > 0 && (
        <>
          <PageTitle title={getRandomWelcomeMessage()} />
          <ProductGrid products={products} />
        </>
      )}
    </>
  );
}

export default Home;