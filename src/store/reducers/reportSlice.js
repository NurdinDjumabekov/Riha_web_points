import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../env";
import axios from "axios";
import { transformDate } from "../../helpers/transformDate";
import { myAlert } from "../../helpers/MyAlert";

const initialState = {
  preloaderReport: false,

  /// список отчетов
  listReport: {
    debt_point_start: [{ id: 1, name: "БКЦ", sum: 100 }], /// Общий долг по точкам на начало

    debt_point_start_total: 500,

    list_leftovers_start: [
      { id: 1, guid: "asdas", name: "Сыр", sum: 10, unit: "кг" },
    ], /// Остатки продукции на начало смены

    list_leftovers_start_total: 200,

    suppliers: [
      {
        date: "22.10.2025",
        name: "Шоро",
        prihod_with: "",
        prihod_without: "",
        kassa: 100,
        return: "",
        spending: "",
      },
    ], /// Поставщики

    result_suppliers: 100, // Остаток+Приход с накруткой - Касса - Возрат - Расход = Долги на конец смены

    debt_point_end: [{ id: 1, name: "БКЦ", sum: 100 }], /// Общий долг по точке на конец

    debt_point_end_total: 1500,

    list_leftovers_end: [
      { id: 1, guid: "asdas", name: "Сыр", sum: 10, unit: "кг" },
    ], /// Остатки продукции на конец смены

    list_leftovers_end_total: 5300,
  },
};

/// getReportZ - get Z отчёт
export const getReportZ = createAsyncThunk(
  "getReportZ",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${API}/tt/desc/report_week`;
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
      // state.listReport = action.payload;
    });
    builder.addCase(getReportZ.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderReport = false;
      // state.listReport = {};
    });
    builder.addCase(getReportZ.pending, (state, action) => {
      state.preloaderReport = true;
    });
  },
});

export const { changeLocalData } = reportSlice.actions;

export default reportSlice.reducer;
