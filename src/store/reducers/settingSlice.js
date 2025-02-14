import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myAlert } from "../../helpers/MyAlert";

import { API } from "../../env";
///////// settingSlice

const initialState = {
  preloader: false,
  listAllProds: [], /// список всех товаров
  listWH: [], /// список цехов
  activeCateg: "1", /// для активных открытых селектор категорий
};

////// getListProdsReq - get список товаров с категориями(все товары)
export const getListProdsReq = createAsyncThunk(
  "getListProdsReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${API}/tt/get_product_user`;
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

////// getListWorkShopActiveReq - get список цехов
export const getListWorkShopActiveReq = createAsyncThunk(
  "getListWorkShopActiveReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${API}/tt/active_wh`;
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

////// crudListWorkShopActiveReq - crud список товаров каждого usera
export const crudListWorkShopActiveReq = createAsyncThunk(
  "crudListWorkShopActiveReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${API}/tt/crud_prods_active`;
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.[0]?.result;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// saveListWorkShopActiveReq - save список изменений товаров каждого usera
export const saveListWorkShopActiveReq = createAsyncThunk(
  "saveListWorkShopActiveReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${API}/tt/save_position_prods`;
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.res;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const settingSlice = createSlice({
  name: "settingSlice",
  initialState,
  reducers: {
    listAllProdsFN: (state, action) => {
      state.listAllProds = action?.payload;
    },

    activeCategFN: (state, action) => {
      state.activeCateg = action?.payload;
    },
  },
  extraReducers: (builder) => {
    ///////////////// getListProdsReq
    builder.addCase(getListProdsReq.fulfilled, (state, action) => {
      state.preloader = false;
      state.listAllProds = action.payload;
    });
    builder.addCase(getListProdsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listAllProds = [];
      state.preloader = false;
    });
    builder.addCase(getListProdsReq.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////// getListWorkShopActiveReq
    builder.addCase(getListWorkShopActiveReq.fulfilled, (state, action) => {
      state.preloader = false;
      state.listWH = action.payload?.map((i) => {
        return { value: i?.workshop_guid, label: i?.workshop_name };
      });
    });
    builder.addCase(getListWorkShopActiveReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listWH = [];
    });
    builder.addCase(getListWorkShopActiveReq.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const { listAllProdsFN, activeCategFN, activeWH_FN, activeUserWH_FN } =
  settingSlice.actions;

export default settingSlice.reducer;
