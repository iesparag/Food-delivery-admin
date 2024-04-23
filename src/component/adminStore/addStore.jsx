import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";
export function AddStore({
  open,
  setOpen,
  formik,
  showError,
  fileRef,
  isAddLoader,
  Header,
  disabled,
}) {
  return (
    <>
      <Dialog size="xs" open={open} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              {Header}
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter Store Details.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Store Name
            </Typography>
            <Input
              label="Store Name"
              name="storeName"
              onChange={formik?.handleChange}
              value={formik?.values.storeName}
              onBlur={formik?.handleBlur}
              size="lg"
            />

            {showError("storeName") && (
              <div className="error" style={{ color: "red" }}>
                {formik.errors?.storeName}
              </div>
            )}
            <Typography className="-mb-2" variant="h6">
              Store City
            </Typography>
            <Input
              label="City"
              name="city"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.city}
              size="lg"
            />
            {showError("city") && (
              <div className="error" style={{ color: "red" }}>
                {formik.errors?.city}
              </div>
            )}

            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              ref={fileRef}
              name="file"
              onBlur={formik.handleBlur}
              value={formik.values.file}
              onChange={formik.handleChange}
            />
            {showError("file") && (
              <div className="error" style={{ color: "red" }}>
                {formik.errors?.file}
              </div>
            )}
          </CardBody>
          <CardFooter className="pt-0 flex justify-around ">
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
                formik.resetForm();
              }}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              className="ml-2"
              variant="gradient"
              onClick={() => {
                formik.handleSubmit();
              }}
              fullWidth
            >
              {isAddLoader ? (
                <div className="text-center flex justify-center items-center">
                  <Spinner />
                </div>
              ) : disabled ? (
                `Update Store`
              ) : (
                `Add Store`
              )}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
