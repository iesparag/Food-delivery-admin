import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";

export function DeleteDialog({
  open,
  setOpen,
  handleDeleteStoreData,
  isDeleteLoader,
}) {
  return (
    <>
      <Dialog open={open} size="sm">
        <DialogHeader>Are you sure you want to Delete?</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={handleDeleteStoreData}
          >
            <span> {isDeleteLoader ? <Spinner /> : "Delete"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
