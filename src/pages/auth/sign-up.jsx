import { Input, Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";
import { Signup } from "@/api/auth";
import { useState } from "react";
import { Loader } from "@/component/loader/loader";
import { SignupSchema } from "../../schema/signupSchema";

export function SignUp() {
  const [successMessage, setSuccessMessage] = useState(false);
  const [signUpData, setSignupData] = useState({});
  const [isLoading, setIsloading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      userType: "seller",
      zipcode: null,
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      handleSignup();
    },
  });

  const handleSignup = async () => {
    const payload = {
      email: formik.values.email,
      password: formik.values.password,
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      userType: formik.values.userType,
      zipcode: formik.values.zipcode,
    };
    setIsloading(true);
    try {
      const response = await Signup(payload);
      if (response.status === 201) {
        setIsloading(false);
        setSignupData(response.data);
        setSuccessMessage(true);
      } else {
        setIsloading(false);
        setSuccessMessage(true);
        setSignupData(response.response.data);
      }
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showError = (field) => {
    return formik.touched[field] && formik.errors[field];
  };
  return (
    <section className="p-6 flex gap-4 items-center">
      <div className="w-5/12 relative min-h-[calc(100vh-48px)] hidden lg:flex items-center justify-center bg-gradient-to-tr from-[#9b1b26] to-[#fb8102] rounded-[16px]">
        <img
          src="/img/food.jpg"
          className="h-full w-full  min-h-[calc(100vh-48px)] object-cover rounded-3xl opacity-40"
        />
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center flex-col z-1">
          <img
            src="/img/hyperlocal-marketplace-platform.png"
            className="h-[100px] w-[100px]  rounded-xl"
          />
          <h6 className="text-3xl text-white font-bold mt-5">
            Welcome to Echtzeit
          </h6>
        </div>
      </div>
      <div className="w-full lg:w-7/12 min-h-[calc(100vh-48px)] flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography
            variant="h2"
            className="font-bold mb-4 text-black relative pb-3 after:content-[''] after:h-1.5 after:w-14 after:block after:absolute after:rounded after:mx-auto after:left-0 after:right-0 after:bottom-0 after:bg-gradient-to-tr after:from-black after:to-orange"
          >
            Register
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal text-[#9f9696] text-base"
          >
            Enter your email and password to register.
          </Typography>
        </div>
        <form className="mt-8 formTemplate mb-2 mx-auto max-w-[400px] lg:max-w-[100%] lg:min-w-[340px] max-w-screen-lg lg:w-1/2">
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-5 flex flex-col gap-2">
              <Typography
                variant="small"
                color="blue-gray"
                className=" font-medium"
              >
                FirstName
              </Typography>
              <Input
                size="lg"
                placeholder="FirstName"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {showError("firstName") && (
                <div className="error" style={{ color: "red" }}>
                  {formik.errors.firstName}
                </div>
              )}
            </div>
            <div className="mb-5 flex flex-col gap-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                LastName
              </Typography>
              <Input
                size="lg"
                placeholder="LastName"
                name="lastName"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                onChange={formik.handleChange}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onBlur={formik.handleBlur}
              />
              {showError("lastName") && (
                <div className="error" style={{ color: "red" }}>
                  {formik.errors.lastName}
                </div>
              )}
            </div>
          </div>
          <div className="mb-5 flex flex-col gap-2">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="Email"
              onChange={formik.handleChange}
              name="email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onBlur={formik.handleBlur}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {showError("email") && (
              <div className="error" style={{ color: "red" }}>
                {formik.errors.email}
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
              size="lg"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              type="password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {showError("password") && (
              <div className="error" style={{ color: "red" }}>
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="mb-5 flex flex-col gap-2">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Confirm Password
            </Typography>
            <Input
              size="lg"
              placeholder="Confirm Password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="confirmPassword"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {showError("confirmPassword") && (
              <div className="error" style={{ color: "red" }}>
                {formik.errors.confirmPassword}
              </div>
            )}
          </div>
          <div className="mb-5 flex flex-col gap-2">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              UserType
            </Typography>
            <Select
              label="Select Role"
              onBlur={formik.handleBlur}
              name="userType"
              onChange={(value) => {
                formik.setFieldValue("userType", value);
              }}
              value={formik.values.userType}
            >
              {["seller", "buyer", "admin"].map((role) => (
                <Option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Option>
              ))}
            </Select>
            {showError("userType") && (
              <div className="error" style={{ color: "red" }}>
                {formik.errors.userType}
              </div>
            )}
          </div>
          <div className="mb-5 flex flex-col gap-2">
            <Typography
              variant="small"
              color="blue-gray"
              className=" font-medium"
            >
              Zipcode
            </Typography>
            <Input
              size="lg"
              placeholder="Zipcode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="zipcode"
              type="number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {showError("zipcode") && (
              <div className="error" style={{ color: "red" }}>
                {formik.errors.zipcode}
              </div>
            )}
          </div>

          <Button
            className="mt-6 bg-gradient-to-tr from-[#9b1b26] to-[#fb8102] h-12"
            fullWidth
            onClick={formik.handleSubmit}
          >
            {isLoading ? (
              <div className="loader-wrapper">
                <Loader />
              </div>
            ) : (
              `Register Now`
            )}
          </Button>

          {successMessage && (
            <div
              style={{ color: "white" }}
              className={`mb-4 rounded-lg p-4 text-sm mt-4 ${
                signUpData?.message
                  ? "bg-green-400 text-green-800"
                  : "bg-red-400 text-white-500"
              }`}
              role="alert"
            >
              {signUpData?.message || signUpData?.error}
            </div>
          )}
          <Typography
            variant="paragraph"
            className="text-center text-black font-medium mt-4"
          >
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1 text-orange">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
