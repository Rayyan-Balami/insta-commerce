import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import AuthService from "@/appwrite/auth";
import { toast } from "sonner";

export const useAuthInitialization = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const cachedUser = localStorage.getItem("user");

      if (cachedUser) {
        dispatch(login(JSON.parse(cachedUser)));
      } else {
        dispatch(login(null));
      }
    };

    initializeAuth();
  }, [dispatch]);
};
