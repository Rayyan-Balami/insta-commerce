import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAdmin = action.payload?.labels?.includes("admin");
      console.log(state.user, state.isAdmin);
    },
    logout: (state) => {
      state.user = null;
      state.isAdmin = false;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;

