import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

// Utility function to update localStorage
const updateLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
      updateLocalStorage(action.payload);
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
      updateLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      updateLocalStorage(state.cartItems);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
      updateLocalStorage(state.cartItems);
    },
    changeChecked: (state, action) => {
      const { id, checked } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        item.checked = checked;
      }
      updateLocalStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    toggleAll: (state, action) => {
      const checked = action.payload;
      state.cartItems = state.cartItems.map((i) => ({ ...i, checked }));
      updateLocalStorage(state.cartItems);
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  changeChecked,
  clearCart,
  toggleAll,
} = cartSlice.actions;

export default cartSlice.reducer;
