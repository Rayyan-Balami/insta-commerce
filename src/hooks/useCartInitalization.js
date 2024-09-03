import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/store/cartSlice";

export const useCartInitialization = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    if (products.length === 0) return; // Ensure products are loaded before processing the cart

    const localStorageCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    
    dispatch(setCart({ cartItems: localStorageCart, products }));
  }, [products, dispatch]);
};