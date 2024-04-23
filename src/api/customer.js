import { constant } from "@/constant";
import { GetApi, PatchApi } from "../hook/ApiHook";
import "react-toastify/dist/ReactToastify.css";
export const getAllCustomersData = async (page) => {
  try {
    const path = `${constant.baseUrl}/api/v1/users?limit=${8}&page=${page}`;
    const response = await GetApi(path);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const UpdateCustomerRole = async (payload) => {
  try {
    const path = `${constant.baseUrl}/api/v1/users/change-user-detail`;
    const response = await PatchApi(path, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
