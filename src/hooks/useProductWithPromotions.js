import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function useProductWithPromotions() {
  const products = useSelector(state => state.product.products);
  const discounts = useSelector(state => state.promotion.promotions.discounts);
  const promoCodes = useSelector(state => state.promotion.promotions.promoCodes);
  
  // console.log("products", products); // Log products
  // console.log("discounts", discounts); // Log discounts
  // console.log("promoCodes", promoCodes); // Log promoCodes
  
  const [productsWithPromotions, setProductsWithPromotions] = useState([]);

  useEffect(() => {
    if (!products.length || !discounts.length || !promoCodes.length) {
      setProductsWithPromotions([]);
      return;
    }

    const updatedProductsWithPromotions = products.map(product => {
      // Log IDs to see if they match correctly
      // console.log("Checking product ID:", product.$id);

      const allDiscount = discounts.find(discount => discount.type === 'all') || null;
      const productDiscount = discounts.find(discount => {
        // console.log("Checking discount product ID:", discount.product);
        return discount.type === 'product' && product.$id === discount.product;
      }) || null;
      
      const categoryDiscount = discounts.find(discount => discount.type === 'category' && product.category === discount.category) || null;

      // // Log the discounts to verify if the match is correct
      // console.log("allDiscount", allDiscount);
      // console.log("productDiscount", productDiscount);  // <-- This is the key to check
      // console.log("categoryDiscount", categoryDiscount);

      const allPromoCode = promoCodes.find(promoCode => promoCode.type === 'all') || null;
      const productPromoCode = promoCodes.find(promoCode => {
        // console.log("Checking promoCode product ID:", promoCode.product);
        return promoCode.type === 'product' && product.$id === promoCode.product;
      }) || null;

      const categoryPromoCode = promoCodes.find(promoCode => promoCode.type === 'category' && product.category === promoCode.category) || null;

      // console.log("allPromoCode", allPromoCode);
      // console.log("productPromoCode", productPromoCode);
      // console.log("categoryPromoCode", categoryPromoCode);

      //priority product > category > all

      return {
        ...product,
        discount: productDiscount || categoryDiscount || allDiscount || null,
        promoCode: productPromoCode || categoryPromoCode || allPromoCode || null,
      };
    });

    setProductsWithPromotions(updatedProductsWithPromotions);
  }, [products, discounts]);

  return productsWithPromotions;
}

export default useProductWithPromotions;
