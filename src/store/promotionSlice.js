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
      console.log("Adding banner:", action.payload);
      state.promotions.banners = [...action.payload, ...state.promotions.banners];
      console.log("Current banners:", state.promotions.banners);
    },
    deleteBanner: (state, action) => {
      console.log("Deleting banner with id:", action.payload);
      console.log("Current banners:", state.promotions.banners);
      state.promotions.banners = state.promotions.banners.filter(
        (banner) => banner.$id !== action.payload
      );
    },
    updatePromoCard: (state, action) => {
      state.promotions.promoCard = action.payload;
      console.log("Updated promoCard:", state.promotions.promoCard);
    },
    addDiscount: (state, action) => {
      state.promotions.discounts = [action.payload, ...state.promotions.discounts];
    },
    deleteDiscount: (state, action) => {
      state.promotions.discounts = state.promotions.discounts.filter(
        (discount) => discount.$id !== action.payload
      );
    },
    updateDiscount: (state, action) => {
      state.promotions.discounts = state.promotions.discounts.map(
        (discount) =>
          discount.$id === action.payload.$id ? action.payload : discount
      );
    },
    addPromoCode: (state, action) => {
      state.promotions.promoCodes = [action.payload, ...state.promotions.promoCodes];
    },
    updatePromoCode: (state, action) => {
      state.promotions.promoCodes = state.promotions.promoCodes.map(
        (promoCode) =>
          promoCode.$id === action.payload.$id ? action.payload : promoCode
      );
    },
    deletePromoCode: (state, action) => {
      state.promotions.promoCodes = state.promotions.promoCodes.filter(
        (promoCode) => promoCode.$id !== action.payload
      );
    },
  },
});

export const { setPromotions, addBanner, deleteBanner, updatePromoCard , addDiscount, deleteDiscount, updateDiscount , addPromoCode, updatePromoCode, deletePromoCode } = promotionSlice.actions;
export default promotionSlice.reducer;