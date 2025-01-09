import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: { seller_guid: "", seller_fio: "", point_name: "", count_type: "" },
  //// данные пользователя
  activePage: 1,
};

const saveDataSlice = createSlice({
  name: "saveDataSlice",
  initialState,
  reducers: {
    changeLocalData: (state, action) => {
      state.data = action.payload;
    },
    clearLocalData: (state, action) => {
      state.data = {
        seller_guid: "",
        seller_fio: "",
        point_name: "",
        count_type: "",
      };
    },

    activePageFN: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { changeLocalData, clearLocalData, activePageFN } =
  saveDataSlice.actions;

export default saveDataSlice.reducer;
