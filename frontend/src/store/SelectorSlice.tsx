import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isActive: false,
  selectorTitle: "Choose AI Agent",
};

export const selectorSlice = createSlice({
  name: "selector",
  initialState,
  reducers: {
    toggleSelectorItem(state) {
      state.isActive = !state.isActive;
    },
    chooseItem(state, action) {
      state.selectorTitle = action.payload;
    },
  },
});
export const { toggleSelectorItem, chooseItem } = selectorSlice.actions;
export default selectorSlice.reducer;
