import {
  getBestSellingStoreData,
  getMonthlyStatistics,
  getTopSellingProductsData,
} from "@/api/analytics";
import { toast } from "react-toastify";

export const MonthlyStatisticsThunk = async (data) => {
  try {
    const response = await getMonthlyStatistics(data);
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getTopSellingProductsThunk = async (data) => {
  try {
    const response = await getTopSellingProductsData(data);
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getBestSellingStoreDataThunk = async (data) => {
  try {
    const response = await getBestSellingStoreData(data);
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
