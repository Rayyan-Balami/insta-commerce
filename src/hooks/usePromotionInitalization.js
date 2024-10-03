import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPromotions } from "@/store/promotionSlice";
import PromotionService from "@/appwrite/promotion";
import { toast } from "sonner";
import { getENV } from "@/getENV";

// localstorage structure
// promotions = {
//   banners: [],
//   promoCard: {},
//   discounts: [],
//   promoCodes: [],
// }

export const usePromotionInitialization = () => {
  const dispatch = useDispatch();

  const getCachedPromotions = () => {
    const cachedData = localStorage.getItem("promotions");
    const cacheTimestamp = localStorage.getItem("promotions_timestamp");
    if (cachedData && cacheTimestamp) {
      const now = new Date().getTime();
      if (now - parseInt(cacheTimestamp, 10) < Number(getENV("CACHE_LIMIT"))) {
        return JSON.parse(cachedData);
      }
    }
    return null;
  }

  const initializePromotions = async () => {
    try {
      const cachedPromotions = getCachedPromotions();
      if (cachedPromotions) {
        dispatch(setPromotions(cachedPromotions));
        return; // Terminate further execution
      }

      const response = await PromotionService.listPromotions();
      console.log(response);
      // return;
      if (response.success) {
        const promotions = {
          banners: response.result.banners,
          promoCard: response.result.promoCard,
          discounts: response.result.discounts,
          promoCodes: response.result.promoCodes,
        };
        localStorage.setItem("promotions", JSON.stringify(promotions));
        localStorage.setItem("promotions_timestamp", new Date().getTime().toString());
        dispatch(setPromotions(promotions));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to initialize promotions");
    }
  }

  useEffect(() => {
    initializePromotions();
  }, []);
};