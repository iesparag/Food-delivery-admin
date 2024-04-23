import { postApi } from "../hook/ApiHook";

export const Signup = async (payload) => {
  try {
    const path = `https://echtzeit-einkauf.onrender.com/api/v1/users/register`;
    const response = await postApi(path, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const Signin = async (payload) => {
  try {
    const path = `https://echtzeit-einkauf.onrender.com/api/v1/users/register`;
    const response = await postApi(path, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
