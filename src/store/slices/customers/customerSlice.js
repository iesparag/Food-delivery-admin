import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetCustomers, UpdateCustomer } from "./customer-thunk-action";
export const fetchCustomerData = createAsyncThunk("customer/get", GetCustomers);
export const patchCustomerData = createAsyncThunk(
  "customer/patch",
  UpdateCustomer
);
export const patchCustomerStatus = createAsyncThunk(
  "customer/patch_block",
  UpdateCustomer
);
export const ApproveCustomerStatus = createAsyncThunk(
  "customer/customerStatus",
  UpdateCustomer
);

const customerSlice = createSlice({
  name: "customerSlice",
  initialState: {
    customerData: [],
    isLoading: false,
    status: "",
    isEditLoader: false,
    totalCount: null,
    isBlockLoader: false,
    isApproveLoader: false,
  },
  reducers: {
    disableLoader: (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    editRoleType: (state, action) => {
      let { id, value } = action.payload;
      let updatedData = state.customerData.map((data) => {
        return data._id == id ? value : data;
      });
      return {
        ...state,
        customerData: updatedData,
      };
    },

    toggleBlock: (state, action) => {
      let { _id } = action.payload.value;
      let updatedData = state.customerData.map((data) => {
        return data._id === _id ? action.payload.value : data;
      });
      return {
        ...state,
        customerData: updatedData,
      };
    },
    sellerApproveStatus: (state, action) => {
      let { id, value } = action.payload;

      let updatedCustomerData = state.customerData.map((data) => {
        return data._id === id ? value : data;
      });
      return {
        ...state,
        customerData: updatedCustomerData,
      };
    },
  },
  extraReducers: (builder) => {
    //fetch all customer data
    builder.addCase(fetchCustomerData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCustomerData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status =
        action?.payload?.response?.status || action?.payload?.status;
      state.customerData = action?.payload?.data?.data.users || [];
      state.totalCount = action?.payload?.data?.data.totalCount || 1;
    });
    builder.addCase(fetchCustomerData.rejected, (state, action) => {
      state.isLoading = false;
    });
    //customer Role Update
    builder.addCase(patchCustomerData.pending, (state, action) => {
      state.isEditLoader = true;
    });
    builder.addCase(patchCustomerData.fulfilled, (state, action) => {
      state.isEditLoader = false;
    });
    builder.addCase(patchCustomerData.rejected, (state, action) => {
      state.isEditLoader = false;
    });

    //customer Block/unblock
    builder.addCase(patchCustomerStatus.pending, (state, action) => {
      state.isBlockLoader = true;
    });
    builder.addCase(patchCustomerStatus.fulfilled, (state, action) => {
      state.isBlockLoader = false;
    });
    builder.addCase(patchCustomerStatus.rejected, (state, action) => {
      state.isBlockLoader = false;
    });

    //customer approve/disaaprove status update
    builder.addCase(ApproveCustomerStatus.pending, (state, action) => {
      state.isApproveLoader = true;
    });
    builder.addCase(ApproveCustomerStatus.fulfilled, (state, action) => {
      state.isApproveLoader = false;
    });
    builder.addCase(ApproveCustomerStatus.rejected, (state, action) => {
      state.isApproveLoader = false;
    });
  },
});
export const {
  disableLoader,
  editRoleType,
  toggleBlock,
  sellerApproveStatus,
} = customerSlice.actions;
export default customerSlice.reducer;
