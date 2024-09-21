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
    updatePromoCard: (state, action) => {
      // Correctly update promoCard instead of promoCodes
      state.promotions.promoCard = action.payload;
      console.log("Updated promoCard:", state.promotions.promoCard);
    },
  },
});

export const { setPromotions, addBanner, deleteBanner, updatePromoCard } = promotionSlice.actions;
export default promotionSlice.reducer;