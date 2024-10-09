import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function useProductWithPromotions() {
  const products = useSelector(state => state.product.products || []);
  const discounts = useSelector(state => state.promotion.promotions.discounts || []);
  const promoCodes = useSelector(state => state.promotion.promotions.promoCodes || []);
  
  const [productsWithPromotions, setProductsWithPromotions] = useState([]);

  useEffect(() => {
    if (!products.length) {
      setProductsWithPromotions([]);
      return;
    }

    const updatedProductsWithPromotions = products.map(product => {
      const allDiscount = discounts.find(discount => discount.type === 'all') || null;
      const productDiscount = discounts.find(discount => discount.type === 'product' && product.$id === discount.product) || null;
      const categoryDiscount = discounts.find(discount => discount.type === 'category' && product.category === discount.category) || null;

      const allPromoCode = promoCodes.find(promoCode => promoCode.type === 'all') || null;
      const productPromoCode = promoCodes.find(promoCode => promoCode.type === 'product' && product.$id === promoCode.product) || null;
      const categoryPromoCode = promoCodes.find(promoCode => promoCode.type === 'category' && product.category === promoCode.category) || null;

      return {
        ...product,
        discount: productDiscount || categoryDiscount || allDiscount || null,
        promoCode: productPromoCode || categoryPromoCode || allPromoCode || null,
      };
    });

    setProductsWithPromotions(updatedProductsWithPromotions);
  }, [products, discounts, promoCodes]);

  return productsWithPromotions;
}

export default useProductWithPromotions;