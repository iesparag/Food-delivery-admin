import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";
import React from "react";

export const CommsionModal = ({
  setOpen,
  open,
  formik,
  showError,
  isCommissionLoader,
}) => {
  return (
    <div>
      <Dialog size="xs" open={open} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Update Product Commission
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Enter Commission in %
            </Typography>
            <Input
              label="Commission"
              name="commission"
              onChange={formik?.handleChange}
              // value={Math.max(0, formik.values.commission)}
              value={formik.values.commission}
              onBlur={formik?.handleBlur}
              size="lg"
              type="number"
            />

            {showError("commission") && (
              <div className="error" style={{ color: "red" }}>
                {formik.errors?.commission}
              </div>
            )}
          </CardBody>
          <CardFooter className="pt-0 flex justify-around ">
            <Button
              variant="text"
              color="red"
              onClick={() => {
                setOpen(false);
                formik.resetForm();
              }}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              className="ml-2 flex justify-center items-center"
              variant="gradient"
              color="green"
              onClick={() => {
                formik.handleSubmit();
              }}
              fullWidth
            >
              {isCommissionLoader ? <Spinner /> : `Update`}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};
