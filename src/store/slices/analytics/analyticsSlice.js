import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  MonthlyStatisticsThunk,
  getBestSellingStoreDataThunk,
  getTopSellingProductsThunk,
} from "./analytics-thunk";

export const getMonthlyStatisticData = createAsyncThunk(
  "get/analytics/monthlyStatistic",
  MonthlyStatisticsThunk
);
export const getTopSellingProducts = createAsyncThunk(
  "get/analytics/topTenproducts",
  getTopSellingProductsThunk
);
export const getTopSellingStores = createAsyncThunk(
  "get/analytics/bestSellingStore",
  getBestSellingStoreDataThunk
);
export const AnalyticsSlice = createSlice({
  name: "AnalyticsSlice",
  initialState: {
    isAnalyticsLoader: false,
    MonthlyAnalytics: {},
    MonthlyQunatities: {},
    topProductsData: [],
    isTopProductsLoader: false,
    topStoreData: [],
    isTopStoreLoader: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMonthlyStatisticData.pending, (state, action) => {
      state.isAnalyticsLoader = true;
    });
    builder.addCase(getMonthlyStatisticData.fulfilled, (state, action) => {
      state.MonthlyAnalytics = action.payload?.data?.data?.pricesByMonth;
      state.MonthlyQunatities = action.payload?.data?.data?.quantitiesByMonth;
      state.isAnalyticsLoader = false;
    });
    builder.addCase(getMonthlyStatisticData.rejected, (state, action) => {
      state.isAnalyticsLoader = false;
    });

    //best selling product

    builder.addCase(getTopSellingProducts.pending, (state, action) => {
      state.isTopProductsLoader = true;
    });
    builder.addCase(getTopSellingProducts.fulfilled, (state, action) => {
      state.topProductsData = action.payload?.data?.data;
      state.isTopProductsLoader = false;
    });
    builder.addCase(getTopSellingProducts.rejected, (state, action) => {
      state.isTopProductsLoader = false;
    });

    //best selling store

    builder.addCase(getTopSellingStores.pending, (state, action) => {
      state.isTopStoreLoader = true;
    });
    builder.addCase(getTopSellingStores.fulfilled, (state, action) => {
      state.topStoreData = action.payload?.data?.data;
      state.isTopStoreLoader = false;
    });
    builder.addCase(getTopSellingStores.rejected, (state, action) => {
      state.isTopStoreLoader = false;
    });
  },
});
export default AnalyticsSlice.reducer;
