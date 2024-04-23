import { constant } from "@/constant";
import { GetApi } from "../hook/ApiHook";

export const getTableData = async (path) => {
  try {
    const response = await GetApi(path);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDashboardCount = async () => {
  try {
    const path = `${constant.baseUrl}/api/v1/admin/dashboard`;
    const response = await GetApi(path);
    return response;
  } catch (error) {
    console.log(error);
  }
};
