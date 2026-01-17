import { configureStore } from "@reduxjs/toolkit";
import subtitleReducer from "./subtitleSlice.ts";

export const store = configureStore({
  reducer: {
    // "MY REDUCERS"
    subtitles: subtitleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
