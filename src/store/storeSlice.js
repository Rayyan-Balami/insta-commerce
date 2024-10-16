import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  general: {},
  contact: {},
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setGeneral: (state, action) => {
      state.general = action.payload;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    getGeneral: (state) => state.general,
    getContact: (state) => state.contact,
  },
});

export const { setGeneral, setContact } = storeSlice.actions;
export default storeSlice.reducer;