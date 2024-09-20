import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  promotions: {
    banners: [],
    promoCard: {},
    discounts: [],
    promoCodes: [],
  },
};

const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    setPromotions: (state, action) => {
      state.loading = false;
      state.promotions = action.payload;
    },
    addBanner: (state, action) => {
      state.promotions.banners = [...action.payload, ...state.promotions.banners];
    },
    deleteBanner: (state, action) => {
      state.promotions.banners = state.promotions.banners.filter(
        (banner) => banner.$id !== action.payload
      );
    },
  },
});

export const { setPromotions, addBanner, deleteBanner } = promotionSlice.actions;

export default promotionSlice.reducer;