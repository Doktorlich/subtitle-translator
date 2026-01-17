import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ISubtitleProject, SubtitleState } from "../models/subtitle.ts";

const subtitleInitialState:SubtitleState = { subtitleOriginalList: [] };

const subtitleSlice = createSlice({
  name:"subtitle",
  initialState:subtitleInitialState,
  reducers:{
    // применение парсера к субтрам
    //PARSE_SUBTITLE
    addSubtitleFile: (state, action: PayloadAction<ISubtitleProject[]>) => {
      // Используем spread, чтобы добавить новые проекты в существующий массив
      state.subtitleOriginalList.push(...action.payload);
    },
  }

})

export const { addSubtitleFile } = subtitleSlice.actions;
export default subtitleSlice.reducer;