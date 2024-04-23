import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetOrders,
  GetOrdersTodayThunk,
  GetOrdersWeeklyThunk,
  GetSingleOrders,
} from "./orders-thunk-action";

export const fetchOrdersData = createAsyncThunk(
  "orders/get/fulfilled",
  GetOrders
);
export const fetchSingleOrdersData = createAsyncThunk(
  "orders/get",
  GetSingleOrders
);
export const fetchWeeklyOrdersData = createAsyncThunk(
  "orders/get/weekly",
  GetOrdersWeeklyThunk
);

export const fetchTodaysOrdersData = createAsyncThunk(
  "orders/get/today",
  GetOrdersTodayThunk
);

const ordersSlice = createSlice({
  name: "ordersSlice",
  initialState: {
    ordersData: [],
    totalOrders: 0,
    viewOrderData: [],
    isLoading: false,
    error: null,
    isViewStoreLoader: false,
    weeklyOrderData: [],
    isWeeklyOrderLoader: false,
    todayOrderData: [],
    isTodayOrderLoader: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    //All orders
    builder.addCase(fetchOrdersData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrdersData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status =
        action?.payload?.response?.status || action?.payload?.status;
      state.ordersData = action?.payload?.data?.data || [];
      state.totalCount = action?.payload?.data?.data.totalCount || 1;
      state.totalOrders = action?.payload?.data?.totalOrders;
    });
    builder.addCase(fetchOrdersData.rejected, (state, action) => {
      state.isLoading = false;
      state.status =
        action?.payload?.response?.status || action?.payload?.status;
      state.ordersData = action?.payload?.data?.data || [];
      state.totalCount = action?.payload?.data?.data.totalCount || 1;
    });

    //single order data
    builder.addCase(fetchSingleOrdersData.pending, (state, action) => {
      state.isViewStoreLoader = true;
    });
    builder.addCase(fetchSingleOrdersData.fulfilled, (state, action) => {
      state.viewOrderData = action.payload?.data?.data;
      state.isViewStoreLoader = false;
    });
    builder.addCase(fetchSingleOrdersData.rejected, (state, action) => {
      state.isViewStoreLoader = false;
    });

    //weekly orders data

    builder.addCase(fetchWeeklyOrdersData.pending, (state, action) => {
      state.isWeeklyOrderLoader = true;
    });
    builder.addCase(fetchWeeklyOrdersData.fulfilled, (state, action) => {
      state.isWeeklyOrderLoader = false;
      state.weeklyOrderData = action?.payload?.data?.data;
    });
    builder.addCase(fetchWeeklyOrdersData.rejected, (state, action) => {
      state.isWeeklyOrderLoader = false;
    });

    // Todays orders data

    builder.addCase(fetchTodaysOrdersData.pending, (state, action) => {
      state.isTodayOrderLoader = true;
    });
    builder.addCase(fetchTodaysOrdersData.fulfilled, (state, action) => {
      state.isTodayOrderLoader = false;
      state.todayOrderData = action?.payload?.data?.data;
    });
    builder.addCase(fetchTodaysOrdersData.rejected, (state, action) => {
      state.isTodayOrderLoader = false;
    });
  },
});

export default ordersSlice.reducer;
