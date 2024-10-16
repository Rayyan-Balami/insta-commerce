import React from "react";
import { useSelector } from "react-redux";
import ProductGrid from "@/components/home/ProductGrid";
import BannersCarousel from "@/components/home/BannersCarousel";
import NoDataPlaceholder from "@/components/NoDataPlaceholder";
import PageTitle from "@/components/PageTitle";
import { getRandomWelcomeMessage } from "@/components/home/welcomeMesseges";
import useProductWithPromotions from "@/hooks/useProductWithPromotions";

function Home() {
  const loading = useSelector((state) => state.product.loading);
  const products = useProductWithPromotions();

  return (
    <>
      <BannersCarousel />

      {loading ? (
        // Loading state: Display skeleton loaders
        <ProductGrid products={[]} loading={loading} />
      ) : (!products || products.length === 0) ? (
        // No products state: Display placeholder
        <NoDataPlaceholder
          header="Products Coming Soon"
          body="We are working on bringing you the best products. Stay tuned!"
        />
      ) : (
        // Products available state: Display products and page title
        <>
          <PageTitle title={getRandomWelcomeMessage()} />
          <ProductGrid products={products} loading={loading} />
        </>
      )}
    </>
  );
}

export default Home;
