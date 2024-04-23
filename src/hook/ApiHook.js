import { GetToken } from "@/utils/GetRefreshToken";
import axios from "axios";

export const postApi = async (path, data) => {
  try {
    let result = await axios.post(path, data);
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};
export const postApiHook = async (path, data) => {
  try {
    let result = await axios.post(path, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};
export const GetApi = async (path) => {
  try {
    let result = await axios.get(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return result;
  } catch (e) {
    if (
      e.response &&
      (e.response.status === 403 || e.response.status === 401)
    ) {
      try {
        let tokenRefresh = await GetToken();
        localStorage.setItem("accessToken", tokenRefresh);
        const result = await axios.get(path, {
          headers: {
            Authorization: `Bearer ${tokenRefresh}`,
          },
        });
        return result;
      } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
      }
    }

    console.error("Error:", e);
    return e;
  }
};
export const PatchApi = async (path, payload) => {
  try {
    let result = await axios.patch(path, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return result;
  } catch (e) {
    if (
      e.response &&
      (e.response.status === 403 || e.response.status === 401)
    ) {
      try {
        let tokenRefresh = await GetToken();
        localStorage.setItem("accessToken", tokenRefresh);
        const result = await axios.patch(path, payload, {
          headers: {
            Authorization: `Bearer ${tokenRefresh}`,
          },
        });
        return result;
      } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
      }
    }
    console.error(e);
    return e;
  }
};
export const DeleteApi = async (path) => {
  try {
    let result = await axios.delete(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return result;
  } catch (e) {
    if (
      e.response &&
      (e.response.status === 403 || e.response.status === 401)
    ) {
      try {
        let tokenRefresh = await GetToken();
        localStorage.setItem("accessToken", tokenRefresh);
        const result = await axios.delete(path, {
          headers: {
            Authorization: `Bearer ${tokenRefresh}`,
          },
        });
        return result;
      } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
      }
    }
    console.error(e, "show the error here");
    return e;
  }
};
