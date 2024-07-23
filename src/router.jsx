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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      <Route path="order" element={<Order />} />
      <Route path="product" element={<Product />} />
        <Route path="add-product" element={<AddProduct />} />
      {/* <Route path="customer" element={<Customer />} /> */}
      {/* <Route path="analytic" element={<Analytic />} /> */}
      <Route path="setting" element={<Setting />} />
    </Route>
  )
);
