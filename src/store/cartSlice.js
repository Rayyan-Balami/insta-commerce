import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  cartItems: [],
};

// Utility function to update localStorage
const updateLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Transform cart items based on product data
const transformCartItem = (cartItems, products) => {
  return cartItems.map((item) => {
    const product = products.find((p) => p.$id === item.id);
    return {
      ...item,
      name: product ? product.name : "Product Not Found",
      imagePreview: product
        ? product.imagePreviews[0]
        : "https://placehold.co/150?text=Unavailable&font=roboto",
      isAvailable: !!product,
    };
  });
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const { cartItems, products } = action.payload;
      state.cartItems = transformCartItem(cartItems, products);
    },
    addToCart: (state, action) => {
      const {item, products} = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.sku = item.sku;
      } else {
        state.cartItems.unshift(transformCartItem([item], products)[0]);
      }
      updateLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      console.log("Remove from cart", action.payload);
      const id = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.id !== id);
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
      const { id, isChecked } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        item.isChecked = isChecked;
      }
      updateLocalStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
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

