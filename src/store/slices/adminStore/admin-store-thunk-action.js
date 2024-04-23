import {
  addStoreData,
  blockCategoryProduct,
  blockMultipleStoreProduct,
  blockStoreProduct,
  deleteStoreData,
  getSingleStoreData,
  getStoreData,
  updateProductCommission,
  updateStoreData,
} from "@/api/adminStore";
import { toast } from "react-toastify";

export const GetAllStore = async (data) => {
  try {
    const response = await getStoreData(data);
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const GetSingleStoreThunk = async (id) => {
  try {
    const response = await getSingleStoreData(id);
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const AddStoreThunk = async (data) => {
  try {
    const response = await addStoreData(data);
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const UpdateStoreThunk = async ({ id, data }) => {
  try {
    const response = await updateStoreData(id, data);
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const BlockStoreProductThunk = async (payload) => {
  try {
    const response = await blockStoreProduct(
      { storeId: payload.storeId, productId: payload.productId },
      { userId: payload.userId, isProductBlocked: payload.isProductBlocked }
    );
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateProductCommissionThunk = async (payload) => {
  try {
    const response = await updateProductCommission(
      { storeId: payload?.storeId, productId: payload?.productId },
      { commissionPercentage: payload?.value }
    );
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const BlockStoreCategoryThunk = async (payload) => {
  try {
    const response = await blockCategoryProduct(
      { storeId: payload.storeId, categoryId: payload.categoryId },
      { userId: payload.userId, isCategoryBlocked: payload.isCategoryBlocked }
    );
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const BlockStoreMultipleProductThunk = async (payload) => {
  try {
    const response = await blockMultipleStoreProduct(
      payload.storeId,
      payload.data
    );
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const DeleteStoreDataThunk = async (id) => {
  try {
    const response = await deleteStoreData(id);
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
