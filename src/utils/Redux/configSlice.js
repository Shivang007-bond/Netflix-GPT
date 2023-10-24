import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "configurations",
  initialState: {
    lang: "EN",
  },
  reducers: {
    languageChange: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { languageChange } = configSlice.actions;
export default configSlice.reducer;
