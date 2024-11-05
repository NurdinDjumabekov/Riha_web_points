import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../env";
import axios from "axios";
import { transformDate } from "../../helpers/transformDate";

const initialState = {
  preloaderSale: false,
  listProds: [], /// список товаров накладной
  listHistoryInvoice: [], /// список историй накладных
  listWorkShops: [], /// список цехов
  listCategs: [], /// список категорий
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

/// getWorkShops -  get все цеха
export const getWorkShops = createAsyncThunk(
  "getWorkShops",
  async function (props, { dispatch, rejectWithValue }) {
    const { seller_guid } = props;
    const urlLink = `${API}/tt/get_leftover_workshop?seller_guid=${seller_guid}`;
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

/// getCategs -  get все категория
export const getCategs = createAsyncThunk(
  "getCategs",
  async function (props, { dispatch, rejectWithValue }) {
    const { seller_guid, workshop_guid } = props;
    const urlLink = `${API}/tt/get_category?seller_guid=${seller_guid}&workshop_guid=${workshop_guid}`;
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

/// searchProdLeftovers -  для поиска товаров в остатке
export const searchProdLeftovers = createAsyncThunk(
  "searchProdLeftovers",
  async function (props, { dispatch, rejectWithValue }) {
    const { text, seller_guid } = props;
    const urlLink = `${API}/tt/get_product?search=${text}&seller_guid=${seller_guid}`;
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

/// getSortProds - для get продуктов
export const getSortProds = createAsyncThunk(
  "getSortProds",
  async function (props, { dispatch, rejectWithValue }) {
    const { seller_guid, valueCateg, value } = props;
    const urlLink = `${API}/tt/get_product?categ_guid=${valueCateg}&seller_guid=${seller_guid}&workshop_guid=${value}`;
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
    //// getWorkShops
    builder.addCase(getWorkShops.fulfilled, (state, action) => {
      state.preloaderSale = false;
      state.listWorkShops = action.payload?.map((i) => {
        return { label: i?.workshop, value: i?.workshop_guid };
      });
    });
    builder.addCase(getWorkShops.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSale = false;
    });
    builder.addCase(getWorkShops.pending, (state, action) => {
      state.preloaderSale = true;
    });
    //// getCategs
    builder.addCase(getCategs.fulfilled, (state, action) => {
      state.preloaderSale = false;
      state.listCategs = action.payload?.map((i) => {
        return { label: i?.category_name, value: i?.category_guid };
      });
    });
    builder.addCase(getCategs.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSale = false;
    });
    builder.addCase(getCategs.pending, (state, action) => {
      state.preloaderSale = true;
    });

    ///// getSortProds
    builder.addCase(getSortProds.fulfilled, (state, action) => {
      state.preloaderSale = false;
      state.listProds = action.payload;
    });
    builder.addCase(getSortProds.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSale = false;
    });
    builder.addCase(getSortProds.pending, (state, action) => {
      state.preloaderSale = true;
    });

    ////// searchProdLeftovers
    builder.addCase(searchProdLeftovers.fulfilled, (state, action) => {
      // state.preloaderSale = false;
      state.listProds = action.payload;
    });
    builder.addCase(searchProdLeftovers.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloaderSale = false;
    });
    builder.addCase(searchProdLeftovers.pending, (state, action) => {
      // state.preloaderSale = true;
    });
  },
});

export const { changeLocalData } = saleSlice.actions;

export default saleSlice.reducer;
