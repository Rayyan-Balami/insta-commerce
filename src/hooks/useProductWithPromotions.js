import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function useProductWithPromotions() {
  const products = useSelector(state => state.product.products);
  const discounts = useSelector(state => state.promotion.promotions.discounts);
  
  console.log("products", products); // Log products
  console.log("discounts", discounts); // Log discounts
  
  const [productsWithPromotions, setProductsWithPromotions] = useState([]);

  useEffect(() => {
    if (!products.length || !discounts.length) {
      setProductsWithPromotions([]);
      return;
    }

    const updatedProductsWithPromotions = products.map(product => {
      // Log IDs to see if they match correctly
      console.log("Checking product ID:", product.$id);

      const allDiscount = discounts.find(discount => discount.type === 'all') || null;
      const productDiscount = discounts.find(discount => {
        console.log("Checking discount product ID:", discount.product);
        return discount.type === 'product' && product.$id === discount.product;
      }) || null;
      
      const categoryDiscount = discounts.find(discount => discount.type === 'category' && product.category === discount.category) || null;

      // Log the discounts to verify if the match is correct
      console.log("allDiscount", allDiscount);
      console.log("productDiscount", productDiscount);  // <-- This is the key to check
      console.log("categoryDiscount", categoryDiscount);

      return {
        ...product,
        discount: categoryDiscount || productDiscount || allDiscount || null,
      };
    });

    setProductsWithPromotions(updatedProductsWithPromotions);
  }, [products, discounts]);

  return productsWithPromotions;
}

export default useProductWithPromotions;
