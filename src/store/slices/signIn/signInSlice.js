import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  userData: {
    accessToken: "",
    displayName: "",
    email: "",
  },
  refreshToken: "",
  isLoading: false,
};

const signInSlice = createSlice({
  name: "SignIn",
  initialState: initialState,
  reducers: {
    addUserData: (state, action) => {
      return {
        ...state,
        userData: {
          accessToken: action?.payload?.accessToken,
          displayName: action.payload.displayName,
          email: action.payload.email,
        },
      };
    },
    addRefreshToken: (state, action) => {
      return {
        ...state,
        refreshToken: action?.payload,
      };
    },
  },
});

export const { addUserData, addRefreshToken } = signInSlice.actions;

export default signInSlice.reducer;
