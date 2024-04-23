import { getDashboardCount } from "@/api/dashboard";
import { toast } from "react-toastify";

export const GetDashbordCount = async (page) => {
    try {
      const response = await getDashboardCount(page);
      if (response?.response?.status) {
        toast.error(response?.response?.data?.error);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };