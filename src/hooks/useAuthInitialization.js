import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";

export const useAuthInitialization = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      dispatch(setUser(JSON.parse(cachedUser)));
    } else {
      dispatch(setUser(null)); // set default user to null
    }
  }, [dispatch]);
};