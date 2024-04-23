import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddStoreThunk,
  BlockStoreCategoryThunk,
  BlockStoreMultipleProductThunk,
  BlockStoreProductThunk,
  DeleteStoreDataThunk,
  GetAllStore,
  GetSingleStoreThunk,
  UpdateStoreThunk,
  updateProductCommissionThunk,
} from "./admin-store-thunk-action";
export const fetchAllStores = createAsyncThunk("stores/get", GetAllStore);
export const AddStores = createAsyncThunk("stores/post", AddStoreThunk);

export const UpdateDatastores = createAsyncThunk(
  "stores/update",
  UpdateStoreThunk
);
export const UpdateStoreStatus = createAsyncThunk(
  "stores/updateStatus",
  UpdateStoreThunk
);
export const UpdateStoreApproveStatus = createAsyncThunk(
  "stores/updateApproveStatus",
  UpdateStoreThunk
);
export const UpdateBlockStoreProducts = createAsyncThunk(
  "stores/updateStatus/blockProduct",
  BlockStoreProductThunk
);
export const UpdateCommissionStoreProducts = createAsyncThunk(
  "stores/update/commission",
  updateProductCommissionThunk
);
export const UpdateBlockStoreCategory = createAsyncThunk(
  "stores/updateStatus/blockCategory",
  BlockStoreCategoryThunk
);
export const UpdateMultipleBlockStoreProducts = createAsyncThunk(
  "stores/updateStatus/blockProductMultiple",
  BlockStoreMultipleProductThunk
);
export const DeleteDatastores = createAsyncThunk(
  "stores/delete",
  DeleteStoreDataThunk
);
export const fetchSingleDatastores = createAsyncThunk(
  "stores/getSingle",
  GetSingleStoreThunk
);

const adminStoreSlice = createSlice({
  name: "adminStoreSlice",
  initialState: {
    storeData: [],
    totalStoreCount: 0,
    usersList: [],
    viewStoreData: {},
    isLoading: false,
    status: "",
    isEditLoader: false,
    isAddLoader: false,
    isDeleteLoader: false,
    isViewStoreLoader: false,
    isBlockLoader: false,
    isProductBlockedLoader: false,
    isMultipleStoreLoader: false,
    isCategoryBlockLoader: false,

    isCommissionLoader: false,
    isStoreApproveLoader: false,
  },
  reducers: {
    toggleBlockunblock: (state, action) => {
      let updatedData = state.storeData.map((data) => {
        return data._id === action?.payload?._id ? action?.payload : data;
      });
      return {
        ...state,
        storeData: updatedData,
      };
    },
    toggleStoreProductBlocked: (state, action) => {
      let updatedStoreProducts = state.viewStoreData.storeProducts.map(
        (data) => {
          return data._id === action?.payload?._id ? action.payload : data;
        }
      );
      return {
        ...state,
        viewStoreData: {
          ...state.viewStoreData,
          storeProducts: updatedStoreProducts,
        },
      };
    },
    blockMultipleStoreProducts: (state, action) => {
      let payloadProducts = action?.payload?.map((data) => data.product);
      payloadProducts = payloadProducts.map((data) => {
        return {
          ...data,
          isChecked: data?.isProductBlocked,
        };
      });
      let updatedProducts = state?.viewStoreData?.storeProducts?.map(
        (storeProduct) => {
          let matchedPayloadProduct = payloadProducts.find(
            (payloadProduct) => storeProduct._id === payloadProduct?._id
          );
          return matchedPayloadProduct ? matchedPayloadProduct : storeProduct;
        }
      );

      return {
        ...state,
        viewStoreData: {
          ...state.viewStoreData,
          storeProducts: updatedProducts,
        },
      };
    },
    blockCategoryStoreProducts: (state, action) => {
      let updatedCategory = state.viewStoreData.categories.map((data) => {
        return data._id == action?.payload?._id ? action.payload : data;
      });
      return {
        ...state,
        viewStoreData: { ...state.viewStoreData, categories: updatedCategory },
      };
    },
    blockSpecificCategoryProducts: (state, action) => {
      let updatedStoreProducts = state.viewStoreData.storeProducts.map(
        (data) => {
          return data.categoryId?._id == action?.payload.categoryId
            ? {
                ...data,
                isProductBlocked: action.payload?.isCategoryBlocked,
                isChecked: action?.payload?.isCategoryBlocked,
              }
            : data;
        }
      );
      return {
        ...state,
        viewStoreData: {
          ...state.viewStoreData,
          storeProducts: updatedStoreProducts,
        },
      };
    },
    categoryCheckUnCheck: (state, action) => {
      let updatedCategoryCheck = state.viewStoreData.categories.map((data) => {
        return data._id == action?.payload
          ? { ...data, isCategorySelected: true }
          : { ...data, isCategorySelected: false };
      });
      return {
        ...state,
        viewStoreData: {
          ...state.viewStoreData,
          categories: updatedCategoryCheck,
        },
      };
    },
    productCheckUnCheck: (state, action) => {
      let updatedProductCheck = state.viewStoreData?.storeProducts?.map(
        (data) => {
          return data._id == action?.payload?._id
            ? { ...data, isChecked: !action.payload.isChecked }
            : data;
        }
      );

      return {
        ...state,
        viewStoreData: {
          ...state.viewStoreData,
          storeProducts: updatedProductCheck,
        },
      };
    },

    restoreProductonCancel: (state, action) => {
      let updatedData = state.viewStoreData?.storeProducts.map(
        (storeProducts) => {
          let matchedProducts = action.payload.find(
            (payloadProducts) => storeProducts?._id == payloadProducts?._id
          );
          return matchedProducts ? matchedProducts : storeProducts;
        }
      );
      return {
        ...state,
        viewStoreData: {
          ...state.viewStoreData,
          storeProducts: updatedData,
        },
      };
    },
    updateProductCommision: (state, action) => {
      let updatedData = state.viewStoreData?.storeProducts?.map((data) => {
        return data._id == action?.payload?._id ? { ...action?.payload } : data;
      });
      return {
        ...state,
        viewStoreData: {
          ...state.viewStoreData,
          storeProducts: updatedData,
        },
      };
    },
    updateApproveStoreStatus: (state, action) => {
      let updatedStoreData = state.storeData.map((data) => {
        return data._id == action?.payload?._id ? action.payload : data;
      });
      return {
        ...state,
        storeData: updatedStoreData,
      };
    },
  },
  extraReducers: (builder) => {
    //fetch all store
    builder.addCase(fetchAllStores.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllStores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.storeData = action?.payload?.data?.data.stores || [];
      state.totalStoreCount = action?.payload?.data?.data?.totalCount;
      let allUsersData = state.storeData.map((data) => data.createdBy);
      let uniqueData = [...new Set(allUsersData.map((data) => data._id))].map(
        (data) => {
          return {
            id: data,
            userName:
              allUsersData?.find((d) => d._id === data)?.firstName +
              " " +
              allUsersData?.find((d) => d._id === data)?.lastName,
          };
        }
      );
      state.usersList = [
        { id: Math.ceil(Math.random * 5), userName: "All" },
        ...uniqueData,
      ];
      state.isLoading = false;
    });
    builder.addCase(fetchAllStores.rejected, (state, action) => {
      state.isLoading = false;
    });

    //Add data store

    builder.addCase(AddStores.pending, (state, action) => {
      state.isAddLoader = true;
    });
    builder.addCase(AddStores.fulfilled, (state, action) => {
      state.isAddLoader = false;
      if (action?.payload?.data?.data) {
        state.storeData = [...state.storeData, action?.payload?.data?.data];
      }
    });
    builder.addCase(AddStores.rejected, (state, action) => {
      state.isAddLoader = false;
    });

    //update Data store

    builder.addCase(UpdateDatastores.pending, (state, action) => {
      state.isEditLoader = true;
    });
    builder.addCase(UpdateDatastores.fulfilled, (state, action) => {
      let updatedValue = state.storeData.map((data) => {
        return data._id === action?.payload?.data?.data?._id
          ? action?.payload?.data.data
          : data;
      });
      state.isEditLoader = false;
      if (action?.payload?.data?.data) {
        state.storeData = updatedValue;
      }
    });
    builder.addCase(UpdateDatastores.rejected, (state, action) => {
      state.isEditLoader = false;
    });

    //delete data store

    builder.addCase(DeleteDatastores.pending, (state, action) => {
      state.isDeleteLoader = true;
    });
    builder.addCase(DeleteDatastores.fulfilled, (state, action) => {
      let updatedValue = state.storeData.filter((data) => {
        return data._id != action?.payload?.data?.data?._id;
      });
      if (action?.payload?.data?.data) {
        state.storeData = updatedValue;
      }
      state.isDeleteLoader = false;
    });
    builder.addCase(DeleteDatastores.rejected, (state, action) => {
      state.isDeleteLoader = false;
    });

    //fetch single store

    builder.addCase(fetchSingleDatastores.pending, (state, action) => {
      state.isViewStoreLoader = true;
    });
    builder.addCase(fetchSingleDatastores.fulfilled, (state, action) => {
      state.viewStoreData = action.payload?.data?.data;
      let updatedCategoryData = state?.viewStoreData?.categories?.map(
        (data) => {
          return { ...data, isCategorySelected: false };
        }
      );
      updatedCategoryData = [
        { categoryName: "All Categories", isCategorySelected: true },
        ...updatedCategoryData,
      ];
      let updatedProductsStore = state?.viewStoreData?.storeProducts?.map(
        (data) => {
          return { ...data, isChecked: data.isProductBlocked };
        }
      );
      state.viewStoreData = {
        ...state.viewStoreData,
        categories: updatedCategoryData,
        storeProducts: updatedProductsStore,
      };
      state.isViewStoreLoader = false;
    });
    builder.addCase(fetchSingleDatastores.rejected, (state, action) => {
      state.isViewStoreLoader = false;
    });

    //block store

    builder.addCase(UpdateStoreStatus.pending, (state, action) => {
      state.isBlockLoader = true;
    });
    builder.addCase(UpdateStoreStatus.fulfilled, (state, action) => {
      state.isBlockLoader = false;
    });
    builder.addCase(UpdateStoreStatus.rejected, (state, action) => {
      state.isBlockLoader = false;
    });

    //block store product

    builder.addCase(UpdateBlockStoreProducts.pending, (state, action) => {
      state.isProductBlockedLoader = true;
    });
    builder.addCase(UpdateBlockStoreProducts.fulfilled, (state, action) => {
      state.isProductBlockedLoader = false;
    });
    builder.addCase(UpdateBlockStoreProducts.rejected, (state, action) => {
      state.isProductBlockedLoader = false;
    });

    //block multiple store product

    builder.addCase(
      UpdateMultipleBlockStoreProducts.pending,
      (state, action) => {
        state.isMultipleStoreLoader = true;
      }
    );
    builder.addCase(
      UpdateMultipleBlockStoreProducts.fulfilled,
      (state, action) => {
        state.isMultipleStoreLoader = false;
      }
    );
    builder.addCase(
      UpdateMultipleBlockStoreProducts.rejected,
      (state, action) => {
        state.isMultipleStoreLoader = false;
      }
    );

    //block category

    builder.addCase(UpdateBlockStoreCategory.pending, (state, action) => {
      state.isCategoryBlockLoader = true;
    });
    builder.addCase(UpdateBlockStoreCategory.fulfilled, (state, action) => {
      state.isCategoryBlockLoader = false;
    });
    builder.addCase(UpdateBlockStoreCategory.rejected, (state, action) => {
      state.isCategoryBlockLoader = false;
    });

    //update product commission
    builder.addCase(UpdateCommissionStoreProducts.pending, (state, action) => {
      state.isCommissionLoader = true;
    });
    builder.addCase(
      UpdateCommissionStoreProducts.fulfilled,
      (state, action) => {
        state.isCommissionLoader = false;
      }
    );
    builder.addCase(UpdateCommissionStoreProducts.rejected, (state, action) => {
      state.isCommissionLoader = false;
    });

    //updated store approve status
    builder.addCase(UpdateStoreApproveStatus.pending, (state, action) => {
      state.isStoreApproveLoader = true;
    });
    builder.addCase(UpdateStoreApproveStatus.fulfilled, (state, action) => {
      state.isStoreApproveLoader = false;
    });
    builder.addCase(UpdateStoreApproveStatus.rejected, (state, action) => {
      state.isStoreApproveLoader = false;
    });
  },
});
export const {
  toggleBlockunblock,
  toggleStoreProductBlocked,
  blockMultipleStoreProducts,
  categoryCheckUnCheck,
  blockCategoryStoreProducts,
  blockSpecificCategoryProducts,
  productCheckUnCheck,
  restoreProductonCancel,
  updateProductCommision,
  updateApproveStoreStatus,
} = adminStoreSlice?.actions;
export default adminStoreSlice.reducer;
