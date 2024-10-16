import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setGeneral, setContact } from "@/store/storeSlice";
import StoreService from "@/appwrite/store";
import { getENV } from "@/getENV";


export function useStoreInitialization() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeStore = async () => {
      const cachedStoreGeneral = localStorage.getItem("storeGeneral");
      const cachedStoreContact = localStorage.getItem("storeContact");
      const cacheTimestamp = localStorage.getItem("store_timestamp");

      const isCacheValid = cachedStoreGeneral && cachedStoreContact && cacheTimestamp && (new Date().getTime() - parseInt(cacheTimestamp, 10) < Number(getENV("CACHE_LIMIT")));

      if (isCacheValid) {
        dispatch(setGeneral(JSON.parse(cachedStoreGeneral)));
        dispatch(setContact(JSON.parse(cachedStoreContact)));
      } else {
        const response = await StoreService.getStore();
        console.log(response);
        if (response.success) {
          const { general, contact } = response.result;
          dispatch(setGeneral(general));
          dispatch(setContact(contact));
          localStorage.setItem("storeGeneral", JSON.stringify(general));
          localStorage.setItem("storeContact", JSON.stringify(contact));
          localStorage.setItem("store_timestamp", new Date().getTime().toString());
        }
      }
    };

    initializeStore();
  }, [dispatch]);
}