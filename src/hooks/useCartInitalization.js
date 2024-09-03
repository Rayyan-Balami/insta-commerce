import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '@/store/cartSlice';

export const useCartInitialization = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    if (products.length === 0) return; // Ensure products are loaded before processing the cart

    const localStorageCart = JSON.parse(localStorage.getItem('cartItems')) || [];

    console.log("Local Storage Cart:", localStorageCart);
    console.log("Products:", products);

    const transformedCart = localStorageCart.map((item) => {
      console.log("Cart Item:", item);
      const product = products.find((p) => p.$id === item.id);
      console.log("Matched Product:", product);

      return {
        ...item,
        name: product ? product.name : "Product Not Found",
        imagePreview: product
          ? product.imagePreviews[0]
          : "https://placehold.co/150?text=Unavailable&font=roboto",
        isAvailable: !!product,
      };
    });

    dispatch(setCart(transformedCart));
  }, [products, dispatch]); // Depend on products and dispatch
};