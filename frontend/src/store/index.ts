import { configureStore } from "@reduxjs/toolkit";
import subtitleReducer from "./subtitleSlice.ts";
import selectorReducer from "./SelectorSlice.tsx";

export const store = configureStore({
  reducer: {
    // "MY REDUCERS"
    subtitles: subtitleReducer,
    selector: selectorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
