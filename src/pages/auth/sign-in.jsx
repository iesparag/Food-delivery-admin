import { Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "@/firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { addUserData } from "@/store/slices/signIn/signInSlice";
import { Loader } from "@/component/loader/loader";
import sigInDeliveryimage from "../../../assets/DeliveryImage.jpg";
export function SignIn() {
  const dispatch = useDispatch();
  const [, setSignInData] = useState();
  const [sigInLoader, setSignInLoader] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
      .matches(/^\S*$/, "Email cannot contain spaces"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters long")
      .required("Password is required")
      .matches(/^\S*$/, "Password cannot contain spaces"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      handleSignup();
    },
  });

  const loginWithEmailPassword = () => {
    setSignInLoader(true);
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((result) => {
        const user = result;

        if (user?.user) {
          localStorage.setItem("accessToken", user.user.accessToken);
          setSignInLoader(false);
          navigate("/dashboard/home");
          localStorage.setItem(
            "userData",
            JSON.stringify({
              email: user.user.email,
              displayName: user.user.displayName,
            })
          );
          dispatch(addUserData(user.user));
          setSignInData(user);
          setSignInLoader(false);
        } else {
          console.log(user, "user show");
        }
        return user;
      })
      .catch((error) => {
        setSignInLoader(false);
        setSuccessMessage(error?.code?.split("/")?.[1]);
        console.log("Email/Password Sign In Error:", error);
      });
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem("accessToken", user.stsTokenManager.accessToken);
        setSignInLoader(false);
        navigate("/dashboard/home");
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email: user.email,
            displayName: user.displayName,
          })
        );
        dispatch(addUserData(user));
        setSignInData(user);
      })
      .catch((error) => {
        console.error("Google Sign In Error:", error);
      });
  };

  const showError = (field) => {
    return formik.touched[field] && formik.errors[field];
  };
  return (
    <section className="p-6 flex gap-4 items-center">
      <div className="w-5/12 relative h-[calc(100vh-48px)] hidden lg:flex items-center justify-center bg-gradient-to-tr from-[#9b1b26] to-[#fb8102] rounded-[16px]">
        <img
          src={sigInDeliveryimage}
          className="h-full w-full  min-h-[calc(100vh-48px)] object-cover rounded-3xl opacity-50"
        />
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center flex-col z-1">
          <h6 className="text-[36px] lg:text-[48px] text-white font-bold mt-5">
            Welcome to Echtzeit
          </h6>
        </div>
      </div>
      <div className="w-full lg:w-7/12 h-[calc(100vh-48px)] flex flex-col items-center justify-center">
        <div className="text-center">
          <img
            src="/img/hyperlocal-marketplace-platform.png"
            className="h-[100px] w-[100px] mx-auto mb-5 rounded-xl"
          />
          <Typography
            variant="h2"
            className="font-bold mb-4 text-black relative pb-3 after:content-[''] after:h-1.5 after:w-14 after:block after:absolute after:rounded after:mx-auto after:left-0 after:right-0 after:bottom-0 after:bg-gradient-to-tr after:from-black after:to-orange"
          >
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal text-[#9f9696] text-base"
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto max-w-[400px] lg:max-w-[100%] lg:min-w-[340px] max-w-screen-lg lg:w-1/2">
          <div className="mb-5 flex flex-col gap-2">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Your email
            </Typography>
            <Input
              size="lg"
              name="email"
              onChange={formik.handleChange}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onBlur={formik.handleBlur}
            />
            {showError("email") && (
              <div className="error" style={{ color: "red" }}>
                {formik.errors?.email}
              </div>
            )}
          </div>
          <div className="mb-5 flex flex-col gap-2">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            {showError("password") && (
              <div className="error" style={{ color: "red" }}>
                {formik.errors?.password}
              </div>
            )}
          </div>

          <Button
            className="mt-6 bg-gradient-to-tr from-[#9b1b26] to-[#fb8102]"
            fullWidth
            onClick={loginWithEmailPassword}
          >
            {sigInLoader ? (
              <div className="loader-wrapper">
                <Loader />
              </div>
            ) : (
              `Sign In`
            )}
          </Button>
          {successMessage?.length > 0 && (
            <div
              style={{ color: "white" }}
              className={`mb-4 rounded-lg p-4 text-sm mt-4 ${
                successMessage && "bg-red-400 text-white-500"
              }`}
              role="alert"
            >
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default SignIn;
