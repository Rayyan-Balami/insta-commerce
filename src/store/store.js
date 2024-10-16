import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import promotionReducer from "./promotionSlice";
import storeReducer from "./storeSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    promotion: promotionReducer,
    store: storeReducer,
  },
});