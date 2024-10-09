import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  products: [],
  filteredProducts: [],
  searchResults: [],
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
      action.payload.skus = JSON.parse(action.payload.skus);
      state.products.unshift(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.$id === action.payload.$id
      );
      if (index !== -1) {
        action.payload.skus = JSON.parse(action.payload.skus);
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.$id !== action.payload
      );
      console.log("Product deleted:", action.payload);
      console.log("Products:", state.products);
    },
    filterProducts: (state, action) => {
      const { category, priceRange } = action.payload;
      console.log('Filter params:', { category, priceRange });
    
      state.filteredProducts = state.products.filter((product) => {
        let matches = true;
    
        if (category) {
          console.log(`Checking category: ${product.category} === ${category}`);
          matches = matches && product.category === category;
        }
        if (priceRange) {
          const { min, max } = priceRange;
          console.log(`Checking price: ${product.price} >= ${min} && ${product.price} <= ${max}`);
          matches = matches && product.price >= min && product.price <= max;
        }
    
        return matches;
      });
    },    
    searchProducts: (state, action) => {
      const { category, name } = action.payload;
      state.searchResults = state.products.filter((product) => {
        let matches = true;

        if (category) {
          matches = matches && product.category.toLowerCase().includes(category.toLowerCase());
        }
        if (name) {
          matches = matches && product.name.toLowerCase().includes(name.toLowerCase());
        }

        return matches;
      });
    },
  },
});

export const { 
  setProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  filterProducts, 
  searchProducts 
} = productSlice.actions;

export default productSlice.reducer;
