import { Dashboard, Auth } from "@/layouts";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { SignIn } from "./pages/auth";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addUserData } from "./store/slices/signIn/signInSlice";
import { GetToken } from "./utils/GetRefreshToken";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/sign-in");
    }
    let userData = localStorage?.getItem("userData");
    userData = (userData && JSON.parse(userData)) || "";
    dispatch(addUserData(userData));
  }, [isAuthenticated]);

  return (
    <div>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/auth/*" element={<Auth />} />
          </>
        ) : (
          <>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route
              path="*"
              element={<Navigate to="/dashboard/home" replace />}
            />
          </>
        )}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
