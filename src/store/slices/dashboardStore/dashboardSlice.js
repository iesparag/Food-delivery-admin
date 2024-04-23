import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetDashbordCount } from "./dashboard-thunk-action";

export const fetchDashoboardCount = createAsyncThunk(
  "dashbord/get/count",
  GetDashbordCount
);

const dashbordSlice = createSlice({
  name: "dashboardSlice",
  initialState: {
    dashboardCountData: [],
    isdashboardLoader: false,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDashoboardCount.pending, (state, action) => {
      state.isdashboardLoader = true;
    });
    builder.addCase(fetchDashoboardCount.fulfilled, (state, action) => {
      state.dashboardCountData = action.payload?.data?.data;
      state.isdashboardLoader = false;
    });
    builder.addCase(fetchDashoboardCount.rejected, (state, action) => {
      state.isdashboardLoader = false;
    });
  },
});

export default dashbordSlice.reducer;
