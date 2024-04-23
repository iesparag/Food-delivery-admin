import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  ApproveCustomerStatus,
  editRoleType,
  fetchCustomerData,
  patchCustomerData,
  patchCustomerStatus,
  sellerApproveStatus,
  toggleBlock,
} from "@/store/slices/customers/customerSlice";
import { DialogComp } from "@/component/dialog/dialog";
import { toast } from "react-toastify";
import Pagination from "@/component/pagination/pagination";
import { ConfirmationModal } from "@/component/dialog/confirmationModal";
import { MdBlock } from "react-icons/md";
import CustomerTable from "./customerTable";

const Customer = () => {
  const {
    customerData,
    isLoading,
    totalCount,
    isBlockLoader,
    isApproveLoader,
  } = useSelector((state) => state?.customerSlice);

  const dispatch = useDispatch();
  const [userRoleValue, setUserRoleValue] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const [mounted, setMounted] = useState(false);
  const [updateValues, setUpdateValues] = useState({
    value: "",
    id: "",
  });
  const [blockValues, setBlockValues] = useState({
    isUserBlocked: "",
    id: "",
  });
  const [approveValues, setApproveValues] = useState({
    isSellerAccountApproved: "",
    id: "",
  });
  useEffect(() => {
    setMounted(false);
    const fetchData = () => {
      dispatch(fetchCustomerData(page));
    };
    fetchData();
    setMounted(true);
  }, [page]);

  useEffect(() => {
    if (mounted) {
      dispatch(fetchCustomerData(page));
    }
  }, [page]);
  const handleUserUpdate = async () => {
    const payload = {
      userType: updateValues.value,
      userId: updateValues.id,
    };
    try {
      const response = await dispatch(patchCustomerData(payload));
      if (response?.payload?.status == 200) {
        setOpenDialog(false);
        dispatch(
          editRoleType({
            value: response?.payload?.data?.data,
            id: updateValues?.id,
          })
        );
        toast.success(response?.payload?.data?.message);
      } else {
        setOpenDialog(false);
        dispatch(patchCustomerData(payload));
        return toast.error(
          response.payload.response.data.error ||
            response.payload.response.data.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBlockModalOpen = (payload) => {
    setOpenBlockDialog(true);
    setBlockValues({
      id: payload.id,
      isUserBlocked: payload.isUserBlocked,
    });
  };
  const handleApproveModalOpen = (payload) => {
    setApproveValues({
      id: payload.id,
      isSellerAccountApproved: payload.isSellerAccountApproved,
    });
    setOpenApproveDialog(true);
  };

  const handleUserActiveStatus = async (payload) => {
    try {
      const response = await dispatch(
        patchCustomerStatus({
          isUserBlocked: blockValues.isUserBlocked,
          userId: blockValues.id,
        })
      );
      if (response.payload.status == 200) {
        dispatch(
          toggleBlock({
            value: response?.payload?.data?.data,
            id: updateValues?.id,
          })
        );
        toast.success(response?.payload?.data?.message);
        setOpenBlockDialog(false);
      } else {
        setOpenDialog(false);
        return toast.error(
          response.payload.response.data.error ||
            response.payload.response.data.message
        );
      }
    } catch (error) {}
  };

  const handleUpdateApproveStatus = async () => {
    try {
      const response = await dispatch(
        ApproveCustomerStatus({
          userId: approveValues.id,
          isSellerAccountApproved: approveValues.isSellerAccountApproved,
        })
      );
      if (response.payload.status == 200) {
        dispatch(
          sellerApproveStatus({
            value: response?.payload?.data?.data,
            id: approveValues?.id,
          })
        );
        toast.success(response?.payload?.data?.message);
        setOpenApproveDialog(false);
      } else {
        setOpenApproveDialog(false);
        return toast.error(
          response.payload.response.data.error ||
            response.payload.response.data.message
        );
      }
    } catch (error) {
      console.log(error);
      setOpenApproveDialog(false);
      throw error;
    }
  };

  const handleUpdateRoleChange = (e, payload) => {
    e.preventDefault();
    setUpdateValues({
      value: payload.role,
      id: payload.id,
    });
    setOpenDialog(true);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 min-h-[calc(100vh-220px)]">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 bg-gradient-to-tr from-[#9b1b26] to-[#fb8102] text-white"
        >
          <Typography variant="h6" color="white">
            Customers
          </Typography>
        </CardHeader>
        <div className="flex items-center justify-end w-full px-5 py-2">
          <div className="smallInput">
            <Select
              className=""
              label="Select Role"
              value={userRoleValue}
              name="userType"
              onChange={(e) => {
                setUserRoleValue(e);
              }}
            >
              <Option value="buyer">Buyer</Option>
              <Option value="seller">Seller</Option>
              <Option value="all">All</Option>
            </Select>
          </div>
        </div>
        <CardBody className="overflow-x-auto px-5 pt-0 pb-2">
          <CustomerTable
            isLoading={isLoading}
            customerData={customerData}
            handleBlockModalOpen={handleBlockModalOpen}
            userRoleValue={userRoleValue}
            setOpenDialog={setOpenDialog}
            setUpdateValues={setUpdateValues}
            handleUpdateRoleChange={handleUpdateRoleChange}
            handleApproveModalOpen={handleApproveModalOpen}
          />
          <DialogComp
            open={openDialog}
            setOpen={setOpenDialog}
            handleUpdate={handleUserUpdate}
          />
          <ConfirmationModal
            setOpen={setOpenBlockDialog}
            open={openBlockDialog}
            heading={!blockValues?.isUserBlocked ? "UnBlock" : "Block"}
            handleConfirm={handleUserActiveStatus}
            Loader={isBlockLoader}
            buttonColor={"red"}
            buttonIcon={<MdBlock />}
          />
          <ConfirmationModal
            setOpen={setOpenApproveDialog}
            open={openApproveDialog}
            heading={
              approveValues?.isSellerAccountApproved ? "Approve" : "Disable"
            }
            handleConfirm={handleUpdateApproveStatus}
            Loader={isApproveLoader}
            buttonColor={"red"}
            buttonIcon={<MdBlock />}
          />
        </CardBody>
        <div className="pagination_wrapper float-right flex justify-end">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </Card>
    </div>
  );
};

export default Customer;
