import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Spinner } from "@material-tailwind/react";

export function DialogComp({ open, setOpen, handleUpdate }) {
  const { isEditLoader } = useSelector((state) => state.customerSlice);

  return (
    <>
      <Dialog open={open} size="sm">
        <DialogHeader>Are you sure you want to Update?</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setOpen(false);
            }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleUpdate}>
            <span> {isEditLoader ? <Spinner /> : "Update"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
