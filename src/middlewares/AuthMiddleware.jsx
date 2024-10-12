import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthMiddleware = () => {
  const {user , isAdmin} = useSelector((state) => state.auth);
  return user && isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
};