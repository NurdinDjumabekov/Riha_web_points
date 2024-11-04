import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../env";
import axios from "axios";
import { transformDate } from "../../helpers/transformDate";

const initialState = {
  preloaderSale: false,
  listProds: [], /// список товаров накладной
  listHistoryInvoice: [], /// список историй накладных
};

/// createInvoice - создание накладных накладных
export const createInvoice = createAsyncThunk(
  "createInvoice",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${API}/tt/desc/create_invoice`;
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

/// getProducts - для получения продуктов
export const getProducts = createAsyncThunk(
  "getProducts",
  async function (props, { dispatch, rejectWithValue }) {
    const { invoice_guid } = props;
    const urlLink = `${API}/tt/desc/get_point_invoice_product?invoice_guid=${invoice_guid}`;
    try {
      const response = await axios(urlLink);
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

/// getProductsInQr - для получения продуктов через QR
export const getProductsInQr = createAsyncThunk(
  "getProductsInQr",
  async function (props, { dispatch, rejectWithValue }) {
    const { seller_guid, qrcode } = props;
    const urlLink = `${API}/tt/get_product_detail?seller_guid=${seller_guid}&qrcode=${qrcode}`;
    try {
      const response = await axios(urlLink);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.[0] || {};
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// addProdInInvoice - добавдение товара в накладную
export const addProdInInvoice = createAsyncThunk(
  "addProdInInvoice",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${API}/tt/desc/create_invoice_product`;
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

/// delProdInInvoice - удаление товара с накладной
export const delProdInInvoice = createAsyncThunk(
  "delProdInInvoice",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${API}/tt/del_product`;
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

/// getHistoryInvoice - для получения историй продаж накладных
export const getHistoryInvoice = createAsyncThunk(
  "getHistoryInvoice",
  async function (props, { dispatch, rejectWithValue }) {
    const { date, seller_guid } = props;
    const urlLink = `${API}/tt/desc/get_point_invoice?seller_guid=${seller_guid}`; // &date=08.08.2024-08.08.2024
    try {
      const response = await axios(urlLink);
      if (response.status >= 200 && response.status < 300) {
        return response?.data || [];
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// updateStatusInvoice - Обновить статус накладной
export const updateStatusInvoice = createAsyncThunk(
  "updateStatusInvoice",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${API}/tt/desc/set_invoice_status`;
    try {
      const response = await axios.put(url, data);
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

const saleSlice = createSlice({
  name: "saleSlice",
  initialState,
  reducers: {
    changeLocalData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    //// getProducts
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.preloaderSale = false;
      state.listProds = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSale = false;
    });
    builder.addCase(getProducts.pending, (state, action) => {
      state.preloaderSale = true;
    });
    //// getHistoryInvoice
    builder.addCase(getHistoryInvoice.fulfilled, (state, action) => {
      state.preloaderSale = false;
      state.listHistoryInvoice = action.payload;
    });
    builder.addCase(getHistoryInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSale = false;
    });
    builder.addCase(getHistoryInvoice.pending, (state, action) => {
      state.preloaderSale = true;
    });
  },
});

export const { changeLocalData } = saleSlice.actions;

export default saleSlice.reducer;
