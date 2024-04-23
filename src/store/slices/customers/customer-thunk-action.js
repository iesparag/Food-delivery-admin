import { UpdateCustomerRole, getAllCustomersData } from "@/api/customer";
import { toast } from "react-toastify";
export const GetCustomers = async (page) => {
  try {
    const response = await getAllCustomersData(page);
    if (response?.response?.status) {
      toast.error(response?.response?.data?.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UpdateCustomer = async (data) => {
  try {
    const response = await UpdateCustomerRole(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
