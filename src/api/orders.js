import { constant } from "@/constant";
import { GetApi } from "../hook/ApiHook";

export const getAllOrdersData = async (page) => {
  try {
    const path = `${
      constant.baseUrl
    }/api/v1/admin/orders?limit=${6}&page=${page}`;
    const response = await GetApi(path);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getWeeklyOrdersData = async () => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/orders?duration=weekly`;
    const response = await GetApi(path);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getTodayOrdersData = async () => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/orders?duration=today`;
    const response = await GetApi(path);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleOrderData = async (id) => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/orders/${id}`;
    const response = await GetApi(path);
    return response;
  } catch (error) {
    console.log(error);
  }
};
