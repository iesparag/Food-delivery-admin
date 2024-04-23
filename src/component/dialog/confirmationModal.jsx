import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";

export function ConfirmationModal({
  open,
  setOpen,
  handleConfirm,
  Loader,
  heading,
  buttonColor,
  handleCancel,
}) {
  return (
    <>
      <Dialog open={open} size="sm">
        <DialogHeader>Are you sure you want to {heading}?</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="green"
            onClick={() => {
              if (handleCancel) {
                handleCancel();
              }
              setOpen(false);
            }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color={buttonColor}
            onClick={handleConfirm}
          >
            <span className="flex justify-center items-center ">
              {" "}
              {Loader ? <Spinner /> : heading}
              {heading == "Block" ? (
                <MdBlock className="ml-2" size={16} />
              ) : (
                heading == "UnBlock" && <CgUnblock className="ml-2" size={16} />
              )}
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
