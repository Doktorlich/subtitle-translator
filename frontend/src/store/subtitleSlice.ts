import { createSlice } from "@reduxjs/toolkit";

const subtitleInitialState = { subtitleOriginalList: [] };

const subtitleSlice = createSlice({
  name:"subtitle",
  initialState:subtitleInitialState,
  reducers:{
    // применение парсера к субтрам
    //PARSE_SUBTITLE
  }

})
