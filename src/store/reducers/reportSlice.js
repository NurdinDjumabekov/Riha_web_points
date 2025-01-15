import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../env";
import axios from "axios";
import { transformDate } from "../../helpers/transformDate";
import { myAlert } from "../../helpers/MyAlert";

const initialState = {
  preloaderReport: false,
  listReport: [], /// список отчетов
};

/// getReportZ - get Z отчёт
export const getReportZ = createAsyncThunk(
  "getReportZ",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${API}/tt/++++++++++++++++`;
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reportSlice = createSlice({
  name: "reportSlice",
  initialState,
  reducers: {
    changeLocalData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    //// getReportZ
    builder.addCase(getReportZ.fulfilled, (state, action) => {
      state.preloaderReport = false;
      state.listReport = action.payload;
    });
    builder.addCase(getReportZ.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderReport = false;
      state.listReport = [];
    });
    builder.addCase(getReportZ.pending, (state, action) => {
      state.preloaderReport = true;
    });
  },
});

export const { changeLocalData } = reportSlice.actions;

export default reportSlice.reducer;
