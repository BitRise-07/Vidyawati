import { createSlice } from "@reduxjs/toolkit";

const storedTotalItems = localStorage.getItem("totalItems");

const initialState = {
  totalItems: storedTotalItems ? Number(storedTotalItems) : 0,
  total: 0, 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    resetCart(state) {
      state.totalItems = 0;
      state.total = 0;
    },
  },
});

export const { setTotalItems, setTotal, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
