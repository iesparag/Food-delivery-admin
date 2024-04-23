import {
  getAllOrdersData,
  getSingleOrderData,
  getTodayOrdersData,
  getWeeklyOrdersData,
} from "@/api/orders";
import { toast } from "react-toastify";

export const GetOrders = async (page) => {
  try {
    const response = await getAllOrdersData(page);
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const GetOrdersWeeklyThunk = async () => {
  try {
    const response = await getWeeklyOrdersData();
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetSingleOrders = async (id) => {
  try {
    const response = await getSingleOrderData(id);
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetOrdersTodayThunk = async () => {
  try {
    const response = await getTodayOrdersData();
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
