import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthMiddleware = () => {
  const user = useSelector((state) => state.auth.user);

  return user ? <Outlet /> : <Navigate to="/admin/login" />;
};