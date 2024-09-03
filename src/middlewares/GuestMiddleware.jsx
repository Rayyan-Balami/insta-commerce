import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const GuestMiddleware = () => {
  const user = useSelector((state) => state.auth.user);

  return !user ? <Outlet /> : <Navigate to="/" />;
};
