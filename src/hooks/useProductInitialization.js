import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "@/store/productSlice";
import ProductService from "@/appwrite/product";
import { toast } from "sonner";
import { getENV } from "@/getENV";

export const useProductInitialization = () => {
  const dispatch = useDispatch();

  const getCachedProducts = () => {
    const cachedData = localStorage.getItem("products");
    const cacheTimestamp = localStorage.getItem("products_timestamp");
    if (cachedData && cacheTimestamp) {
      const now = new Date().getTime();
      if (now - parseInt(cacheTimestamp, 10) < Number(getENV("CACHE_LIMIT"))) {
        return JSON.parse(cachedData);
      }
    }
    return null;
  };

  const initializeProducts = async () => {
    try {
      const cachedProducts = getCachedProducts();
      if (cachedProducts) {
        dispatch(setProducts(cachedProducts));
        return;
      }
  
      const cachedUser = localStorage.getItem("user");
      const status = cachedUser ? "all" : "active";
      const response = await ProductService.listProducts({ status });
  
      if (!response.success) {
        dispatch(setProducts([]));
        toast.error(response.message);
        return;
      }
  
      dispatch(setProducts(response.result.documents));
      localStorage.setItem("products", JSON.stringify(response.result.documents));
      localStorage.setItem("products_timestamp", new Date().getTime().toString());
    } catch (error) {
      dispatch(setProducts([]));
      toast.error("Failed to load products.");
    }
  };

  useEffect(() => {
    initializeProducts();
  }, [dispatch]);
};