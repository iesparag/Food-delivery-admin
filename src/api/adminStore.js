import { constant } from "@/constant";
import { DeleteApi, GetApi, PatchApi, postApiHook } from "../hook/ApiHook";

export const getStoreData = async (page) => {
  try {
    const path = `${
      constant.baseUrl
    }/api/v1/admin/store?limit=${10}&page=${page}`;
    const response = await GetApi(path);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getSingleStoreData = async (id) => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/store/${id}`;
    const response = await GetApi(path);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addStoreData = async (data) => {
  try {
    const path = `${constant.baseUrl}/api/v1/seller/store`;
    const response = await postApiHook(path, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateStoreData = async (id, data) => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/store/${id}`;
    const response = await PatchApi(path, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const blockStoreProduct = async (Ids, data) => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/store-product/${Ids.storeId}/${Ids.productId}`;
    const response = await PatchApi(path, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const updateProductCommission = async (Ids, data) => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/store-product/${Ids.storeId}/${Ids.productId}`;
    const response = await PatchApi(path, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const blockCategoryProduct = async (Ids, data) => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/category/${Ids.storeId}/${Ids.categoryId}`;
    const response = await PatchApi(path, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const blockMultipleStoreProduct = async (Id, data) => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/store-product/update-many-product/${Id}`;
    const response = await PatchApi(path, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteStoreData = async (id) => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/store/${id}`;
    const response = await DeleteApi(path);
    return response;
  } catch (error) {
    console.log(error);
  }
};
