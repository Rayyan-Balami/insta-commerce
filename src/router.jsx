import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import Order from "./pages/Order";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Promotion from "./pages/Promotion";
import { AdminLogin } from "./pages/AdminLogin";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        <Route path="order" element={<Order />} />
        <Route path="product" element={<Product />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="promotion" element={<Promotion />} />
        {/* <Route path="analytic" element={<Analytic />} /> */}
        <Route path="setting" element={<Setting />} />
        <Route path="view-product" element={<ProductPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="cart" element={<Cart />} />
      </Route>
      <Route path="admin/login" element={<AdminLogin />} />
    </>
  )
);
