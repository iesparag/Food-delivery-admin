import { constant } from "@/constant";
import { GetApi } from "../hook/ApiHook";

export const getMonthlyStatistics = async (year) => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/dashboard/sales-product-counts?year=${year}`;
    const response = await GetApi(path);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getTopSellingProductsData = async (year) => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/dashboard/best-seller-products`;
    const response = await GetApi(path);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getBestSellingStoreData = async (cityName) => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/dashboard/best-top-10-stores?location=${cityName}`;
    const response = await GetApi(path);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
