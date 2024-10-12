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
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { GuestMiddleware } from "./middlewares/GuestMiddleware";
import OAuthSuccess from "./pages/OAuthSuccess";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        {/* Both guests and authenticated users can access the home page */}
        <Route path="" element={<Home />} />
        <Route path="view-product/:id" element={<ProductPage />} />

        <Route path="checkout/:type" element={<Checkout />} />
        <Route path="cart" element={<Cart />} />

        {/* Only authenticated users can access the following routes */}
        <Route element={<AuthMiddleware />}>
          <Route path="order" element={<Order />} />
          <Route path="product" element={<Product />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<AddProduct />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        
      </Route>

      {/* routes thats are not nested in the App component */}

      {/* Only guests can access the following routes */}
      <Route element={<GuestMiddleware />}>
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="oauth/success" element={<OAuthSuccess />} />
        </Route>
    </>
  )
);
