import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customers/customerSlice";
import signInSlice from "./slices/signIn/signInSlice";
// import AdminStore from "./slices/adminStore/adminStoreSlice";
import AdminStore from "./slices/adminStore/adminStoreSlice";
import orderStore from "./slices/orders/ordersSlice";
import dashboardStore from "./slices/dashboardStore/dashboardSlice";
import analyticsSlice from "./slices/analytics/analyticsSlice";
export const appReducer = {
  signInSlice,
  customerSlice,
  AdminStore,
  orderStore,
  dashboardStore,
  analyticsSlice,
};
export const store = configureStore({
  reducer: appReducer,
});
