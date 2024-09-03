import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      state.products[index] = action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    searchProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct, searchProducts } = productSlice.actions;
export default productSlice.reducer;