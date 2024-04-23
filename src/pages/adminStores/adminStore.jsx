import { AddStore } from "@/component/adminStore/addStore";
import {
  AddStores,
  DeleteDatastores,
  UpdateDatastores,
  UpdateStoreApproveStatus,
  UpdateStoreStatus,
  fetchAllStores,
  toggleBlockunblock,
  updateApproveStoreStatus,
} from "@/store/slices/adminStore/adminStoreSlice";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Input,
  Option,
  Select,
  Switch,
  Typography,
} from "@material-tailwind/react";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { formatDate } from "@/utils/FormatDates";
import { Loader } from "@/component/loader/loader";
import { toast } from "react-toastify";
import { DeleteDialog } from "@/component/dialog/deleteModal";
import { MdBlock, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import Pagination from "@/component/pagination/pagination";
import { ConfirmationModal } from "@/component/dialog/confirmationModal";

export const AdminStore = () => {
  const dispatch = useDispatch();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [updateValues, setUpdateValues] = useState({
    storeName: "",
    city: "",
    file: "",
  });
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isApproveConfirmationOpen, setIsApproveConfirmationOpen] = useState(
    false
  );

  const [storeUserDetails, setstoreUserDetails] = useState("all");
  const navigate = useNavigate();
  const {
    storeData,
    isLoading,
    isAddLoader,
    isEditLoader,
    isDeleteLoader,
    usersList,
    totalStoreCount,
    isBlockLoader,
    isStoreApproveLoader,
  } = useSelector((state) => state.AdminStore);
  let fileRef = useRef();

  let FileValue = fileRef?.current?.files?.[0];
  const [page, setPage] = useState(1);
  const [storeUpdateValues, setStoreUpdateValues] = useState({
    _id: "",
    userId: "",
    isStoreBlocked: "",
  });
  const [storeApproveValues, setStoreApproveValues] = useState({
    _id: "",
    userId: "",
    isStoreApproved: "",
  });
  const [blockUnblockValues, setBlockUnblockValues] = useState("All");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalStoreCount / itemsPerPage);
  const storeSchema = Yup.object().shape({
    storeName: Yup.string().required("Store name is required"),
    city: Yup.string().required("City is required"),
    file: Yup.mixed()
      .test("fileType", "Unsupported File Format", () => {
        if (FileValue) {
          return (
            FileValue.type === "image/jpeg" ||
            FileValue.type === "image/jpg" ||
            FileValue.type === "image/png" ||
            FileValue.type === "image/svg"
          );
        } else {
          return true;
        }
      })
      .required("Image is required"),
  });
  const updateStoreSchema = Yup.object().shape({
    storeName: Yup.string().required("Store name is required"),
    city: Yup.string().required("City is required"),
    file: Yup.mixed().test("fileType", "Unsupported File Format", () => {
      if (FileValue) {
        return (
          FileValue.type === "image/jpeg" ||
          FileValue.type === "image/jpg" ||
          FileValue.type === "image/png" ||
          FileValue.type === "image/svg"
        );
      } else {
        return true;
      }
    }),
  });
  const formik = useFormik({
    initialValues: {
      storeName: "",
      city: "",
      file: "",
    },
    validationSchema: storeSchema,
    onSubmit: (values) => {
      if (Object.keys(formik.errors)?.length < 1) {
        handleAddStore();
      }
    },
  });

  const updateFormik = useFormik({
    initialValues: {
      storeName: "",
      city: "",
      file: "",
    },
    validationSchema: updateStoreSchema,
    onSubmit: (values) => {
      if (Object.keys(updateFormik.errors)?.length < 1) {
        handleUpdateStore();
      }
    },
  });

  const handleUpdateStore = async () => {
    try {
      let updateFormData = new FormData();
      updateFormData.append("storeName", updateFormik.values.storeName);
      if (updateFormik.values.city) {
        updateFormData.append("city", updateFormik.values.city);
      }
      if (FileValue) {
        updateFormData.append("logo", FileValue);
      }

      const response = await dispatch(
        UpdateDatastores({ id: updateValues.id, data: updateFormData })
      );
      if (response.payload.status == 200) {
        setIsEditOpen(false);
        return toast.success(response?.payload?.data?.message);
      } else {
        setIsEditOpen(false);
      }
    } catch (error) {
      setIsEditOpen(false);
      console.log(error);
    }
  };
  const showError = (field) => {
    return formik.touched[field] && formik.errors[field];
  };
  const showEditError = (field) => {
    return updateFormik.touched[field] && updateFormik.errors[field];
  };
  useEffect(() => {
    dispatch(fetchAllStores(page));
  }, [page]);

  const handleAddStore = async () => {
    try {
      let formData = new FormData();
      formData.append("storeName", formik.values.storeName);
      formData.append("city", formik.values.city);
      formData.append("logo", FileValue);
      const response = await dispatch(AddStores(formData));
      if (response?.payload?.status == 200) {
        setIsAddOpen(false);
        return toast.success(response?.payload?.data?.message);
      } else {
        setIsAddOpen(false);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleDeleteStoreData = async () => {
    try {
      const response = await dispatch(DeleteDatastores(deleteId));

      if (response.payload?.status == 200) {
        setIsDeleteOpen(false);
        return toast.success(response?.payload?.data?.message);
      } else {
        setIsDeleteOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStoreBlockModelOpen = (payload) => {
    setIsConfirmationOpen(true);
    setStoreUpdateValues({
      _id: payload?.id,
      userId: payload?.userId,
      isStoreBlocked: payload?.isStoreBlocked,
    });
  };
  const handleStoreApproveModelOpen = (payload) => {
    setIsApproveConfirmationOpen(true);
    setStoreApproveValues({
      _id: payload?.id,
      userId: payload?.userId,
      isStoreApproved: payload?.isStoreApproved,
    });
  };

  const handleStoreActiveStatus = async () => {
    try {
      const response = await dispatch(
        UpdateStoreStatus({
          id: storeUpdateValues?._id,
          data: {
            userId: storeUpdateValues?.userId,
            isStoreBlocked: storeUpdateValues?.isStoreBlocked,
          },
        })
      );
      if (response.payload.status == 200) {
        dispatch(toggleBlockunblock(response?.payload?.data?.data));
        toast.success(response?.payload?.data?.message);
        setIsConfirmationOpen(false);
      } else {
        toast.error(response?.payload?.response.data?.message);
        setIsConfirmationOpen(false);
      }
    } catch (error) {
      setIsConfirmationOpen(false);
      console.log(error);
      throw error;
    }
  };

  const handleApproveStoreStatus = async () => {
    try {
      const response = await dispatch(
        UpdateStoreApproveStatus({
          id: storeApproveValues?._id,
          data: {
            userId: storeApproveValues?.userId,
            isStoreApproved: storeApproveValues?.isStoreApproved,
          },
        })
      );
      if (response.payload.status == 200) {
        dispatch(updateApproveStoreStatus(response?.payload?.data?.data));
        toast.success(response?.payload?.data?.message);
        setIsApproveConfirmationOpen(false);
      } else {
        toast.error(response?.payload?.response.data?.message);
        setIsApproveConfirmationOpen(false);
      }
    } catch (error) {
      setIsApproveConfirmationOpen(false);
      console.log(error);
      throw error;
    }
  };

  let storeHeaders = [
    "#",
    "logo",
    "store name",
    "city",
    "created Date",
    "approve",
    "action",
  ];

  let filteredDataHere = storeData
    ?.filter((data) => {
      if (blockUnblockValues == data?.isStoreBlocked) {
        return data;
      } else if (blockUnblockValues == "All") {
        return data;
      }
    })
    ?.filter((data) => {
      if (data?.createdBy?._id == storeUserDetails?.id) {
        return data;
      } else if (
        storeUserDetails == "all" ||
        storeUserDetails?.userName == "All"
      ) {
        return data;
      }
    })
    ?.filter((data) => {
      if (filterValue.trim() === "") return true;
      return (
        data?.storeName?.toLowerCase().includes(filterValue.toLowerCase()) ||
        data?.city?.toLowerCase().includes(filterValue.toLowerCase())
      );
    });

  return (
    <div>
      <div className="mt-12 mb-8 flex flex-col gap-12 min-h-[calc(100vh-220px)]">
        <Card>
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-8 p-6 bg-gradient-to-tr from-[#9b1b26] to-[#fb8102] text-white flex justify-between items-center"
          >
            <Typography variant="h6" color="white">
              Store
            </Typography>
          </CardHeader>
          <div className="w-full">
            <div className="flex justify-end flex-wrap lg:flex-nowrap gap-4 p-5">
              <div className="lg:max-w-[200px] w-full">
                <Input
                  label="Search store"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
              </div>
              <div className="lg:max-w-[200px] w-full">
                <Select
                  label="Sort by Block/Unblock"
                  color="lightBlue"
                  placement="bottom-start"
                  buttonText="Select a user"
                  buttonType="filled"
                  size="regular"
                  rounded={false}
                  block={false}
                  ripple="light"
                  onChange={(e) => {
                    setBlockUnblockValues(e);
                  }}
                >
                  <Option value={"All"}>All</Option>
                  <Option value={true}>Block</Option>
                  <Option value={false}>Unblock</Option>
                </Select>
              </div>
              <div className="lg:max-w-[200px] w-full">
                <Select
                  label="Select by user"
                  color="lightBlue"
                  placement="bottom-start"
                  buttonText="Select a user"
                  buttonType="filled"
                  size="regular"
                  rounded={false}
                  block={false}
                  ripple="light"
                  onChange={(e) => {
                    setstoreUserDetails(e);
                  }}
                >
                  {usersList.map((item) => (
                    <Option key={item.id} value={item}>
                      {item.userName}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
            <div className="flex justify-end w-[20%] float-right mr-5"></div>
            <table className=" w-full  min-w-[600px]  table-auto">
              <thead>
                <tr>
                  {storeHeaders?.map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[12px] font-bold uppercase text-black"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={storeHeaders?.length}>
                      <div className="min-h-[300px] flex items-center justify-center largeLorder">
                        <Loader />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {!storeData || storeData?.length == 0 ? (
                      <tr>
                        <td colSpan={8}>
                          <div className="img_wrap w-full p-4 m-auto">
                            <h1 className="text-[#788895] font-[18px] p-7 text-center border border-dashed border-[#d4dee9] rounded">
                              No Results
                            </h1>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {filteredDataHere?.length > 0 ? (
                          <>
                            {filteredDataHere?.map((data, key) => {
                              const className = `py-3 px-5 ${
                                key === storeData?.length - 1
                                  ? ""
                                  : "border-b border-blue-gray-50"
                              }`;
                              let {
                                city,
                                logo,
                                storeName,
                                _id,
                                createdAt,
                                isStoreBlocked,
                                isStoreApproved,
                              } = data;
                              return (
                                <tr key={_id} className="tableHover">
                                  <td className={className}>
                                    <Typography
                                      variant="small"
                                      className="text-l font-medium text-[#000000]"
                                    >
                                      #
                                    </Typography>
                                  </td>
                                  <td className={className}>
                                    <div className="image_logo_wrapper rounded-[50%] w-12 h-12 overflow-hidden">
                                      <img
                                        className="object-cover w-full h-full"
                                        src={logo}
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  <td className={className}>
                                    <Typography
                                      variant="small"
                                      className="text-l font-medium text-[#000000]"
                                    >
                                      {storeName}
                                    </Typography>
                                  </td>
                                  <td className={className}>
                                    <div className="flex items-center gap-4 ">
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="text-l font-medium text-[#000000]"
                                      >
                                        {city || ""}
                                      </Typography>
                                    </div>
                                  </td>
                                  <td className={className}>
                                    <Typography
                                      variant="small"
                                      className="text-l font-medium text-[#000000]"
                                    >
                                      {formatDate(createdAt)}
                                    </Typography>
                                  </td>
                                  <td className={className}>
                                    {!isStoreApproved ? (
                                      <Switch
                                        checked={isStoreApproved}
                                        disabled={isStoreApproved}
                                        onChange={() => {
                                          handleStoreApproveModelOpen({
                                            id: _id,
                                            userId: data?.createdBy?._id,
                                            isStoreApproved: !isStoreApproved,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <Badge color="green"></Badge>
                                    )}
                                  </td>

                                  <td className={className}>
                                    <div className="action_wrapper flex items-center gap-3">
                                      <Switch
                                        checked={isStoreBlocked}
                                        onChange={() => {
                                          handleStoreBlockModelOpen({
                                            id: _id,
                                            userId: data?.createdBy?._id,
                                            isStoreBlocked: !isStoreBlocked,
                                          });
                                        }}
                                      />
                                      <IoEyeOutline
                                        className="cursor-pointer ml-2"
                                        onClick={() => {
                                          navigate(`/dashboard/store/${_id}`);
                                        }}
                                        size={30}
                                        color="#bd5e00"
                                      />
                                      <MdDelete
                                        className="cursor-pointer"
                                        onClick={() => {
                                          setDeleteId(() => _id);
                                          setIsDeleteOpen(true);
                                        }}
                                        color="#c31313"
                                        size={30}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        ) : (
                          <tr>
                            <td colSpan={8}>
                              <div className="img_wrap w-full p-4 m-auto">
                                <h1 className="text-[#788895] font-[18px] p-7 text-center border border-dashed border-[#d4dee9] rounded">
                                  No Results
                                </h1>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </>
                )}
              </tbody>
            </table>
            <AddStore
              open={isAddOpen}
              formik={formik}
              setOpen={setIsAddOpen}
              showError={showError}
              fileRef={fileRef}
              isAddLoader={isAddLoader}
              Header="Add Store"
            />

            <AddStore
              open={isEditOpen}
              formik={updateFormik}
              setOpen={setIsEditOpen}
              showError={showEditError}
              fileRef={fileRef}
              isAddLoader={isEditLoader}
              Header="Edit Store"
              disabled={true}
            />

            <ConfirmationModal
              setOpen={setIsConfirmationOpen}
              open={isConfirmationOpen}
              heading={!storeUpdateValues?.isStoreBlocked ? "UnBlock" : "Block"}
              handleConfirm={handleStoreActiveStatus}
              Loader={isBlockLoader}
              buttonColor={"red"}
              buttonIcon={<MdBlock />}
            />
            <ConfirmationModal
              setOpen={setIsApproveConfirmationOpen}
              open={isApproveConfirmationOpen}
              heading={
                storeApproveValues?.isStoreApproved ? "Approve" : "Disable"
              }
              handleConfirm={handleApproveStoreStatus}
              Loader={isStoreApproveLoader}
              buttonColor={"red"}
              buttonIcon={<MdBlock />}
            />

            <DeleteDialog
              open={isDeleteOpen}
              setOpen={setIsDeleteOpen}
              handleDeleteStoreData={handleDeleteStoreData}
              isDeleteLoader={isDeleteLoader}
            />
          </CardBody>
          <div className="pagination_wrapper float-right flex justify-end">
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        </Card>
      </div>
    </div>
  );
};
