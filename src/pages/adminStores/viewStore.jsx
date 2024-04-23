import { ConfirmationModal } from "@/component/dialog/confirmationModal";
import { Loader } from "@/component/loader/loader";
import {
  UpdateBlockStoreCategory,
  UpdateBlockStoreProducts,
  UpdateCommissionStoreProducts,
  UpdateMultipleBlockStoreProducts,
  blockCategoryStoreProducts,
  blockMultipleStoreProducts,
  blockSpecificCategoryProducts,
  categoryCheckUnCheck,
  fetchSingleDatastores,
  productCheckUnCheck,
  restoreProductonCancel,
  toggleStoreProductBlocked,
  updateProductCommision,
} from "@/store/slices/adminStore/adminStoreSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Option,
  Select,
  Switch,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { MdBlock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CommsionModal } from "./commsionModal";
import { useFormik } from "formik";
import * as Yup from "yup";

const ViewStore = () => {
  const settings = {
    dots: true,
    infinite: false,
    navs: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const dispatch = useDispatch();
  const { id } = useParams();
  const [blockProductValues, setBlockProductValues] = useState({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isConfirmationOpenMultiple, setIsConfirmationOpenMultiple] = useState(
    false
  );
  const [isConfirmationOpenCategory, setIsConfirmationOpenCategory] = useState(
    false
  );
  const [categoriesValues, setCategoriesValues] = useState({});
  const [selectedCategoryValues, setSelectedCategoryValues] = useState("All");
  const [blockActiveValues, setBlockActiveValues] = useState("All");
  const [openCommissionModal, setOpenCommissionModal] = useState(false);
  const [commissionValue, setCommissionValue] = useState({
    storeId: "",
    product: "",
    value: "",
  });
  const {
    viewStoreData,
    isViewStoreLoader,
    isProductBlockedLoader,
    isMultipleStoreLoader,
    isCategoryBlockLoader,
    isCommissionLoader,
  } = useSelector((state) => state.AdminStore);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const fetchSingleStoreData = async () => {
    try {
      const response = await dispatch(fetchSingleDatastores(id));
    } catch (error) {
      console.log(error);
    }
  };
  const updateCommissionSchema = Yup.object().shape({
    commission: Yup.number()
      .positive()
      .moreThan(-1, "commission must be positive number")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      commission: "",
    },
    validationSchema: updateCommissionSchema,
    onSubmit: (values) => {
      handleUpdateCommission(values);
    },
  });
  const showError = (field) => {
    return formik.touched[field] && formik.errors[field];
  };
  useEffect(() => {
    fetchSingleStoreData();
  }, []);

  const handleProductBlockStatus = async () => {
    try {
      let response = await dispatch(
        UpdateBlockStoreProducts(blockProductValues)
      );
      if (response?.payload?.status === 200) {
        dispatch(toggleStoreProductBlocked(response?.payload?.data?.data));
        toast.success(response?.payload?.data?.message);
        setIsConfirmationOpen(false);
      } else {
        toast.error(response?.payload?.response?.data?.message);
        setIsConfirmationOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductSelection = (data, productId) => {
    viewStoreData.storeProducts.map((data) => {
      return data._id == productId && setIsChecked(!isChecked);
    });
    const isSelected = selectedProducts.includes(productId);
    if (isSelected) {
      setSelectedProducts(
        selectedProducts.filter((data) => data !== productId)
      );
    } else {
      setSelectedProducts(() => [...selectedProducts, productId]);
    }
  };

  let updatedDataHereNow = viewStoreData?.storeProducts?.filter((data, key) => {
    return selectedProducts?.find((productId) => data?._id == productId);
  });

  const handleBlockMultiple = async () => {
    updatedDataHereNow = updatedDataHereNow?.map((data) => {
      return {
        productId: data?._id,
        isProductBlocked: !data?.isProductBlocked,
      };
    });
    try {
      const response = await dispatch(
        UpdateMultipleBlockStoreProducts({
          storeId: id,
          data: updatedDataHereNow,
        })
      );
      if (response.payload.status == 200) {
        dispatch(blockMultipleStoreProducts(response?.payload?.data?.data));
        setIsConfirmationOpenMultiple(false);
        setSelectedProducts([]);
        setIsChecked(false);
        toast.success(response?.payload?.data?.message);
      } else {
        toast.error(response?.payload?.response.data?.message);
        setIsConfirmationOpenMultiple(false);
        let updatedDataHereNow = viewStoreData?.storeProducts?.filter(
          (data, key) => {
            return selectedProducts?.find((productId) => data._id == productId);
          }
        );
        updatedDataHereNow = updatedDataHereNow?.map((data) => {
          return {
            ...data,
            isChecked: data?.isProductBlocked,
          };
        });
        dispatch(restoreProductonCancel(updatedDataHereNow));
        setSelectedProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryModalOpen = (payload) => {
    setIsConfirmationOpenCategory(true);
    setCategoriesValues({ ...payload, storeId: id });
  };

  const handleBlockCategory = async () => {
    try {
      const response = await dispatch(
        UpdateBlockStoreCategory(categoriesValues)
      );
      if (response.payload.status === 200) {
        let payloadUpdate = {
          ...response?.payload?.data?.data,
          isCategorySelected:
            response?.payload?.data?.data?._id == selectedCategoryValues
              ? true
              : false,
        };

        dispatch(blockCategoryStoreProducts(payloadUpdate));
        dispatch(
          blockSpecificCategoryProducts({
            categoryId: categoriesValues?.categoryId,
            isCategoryBlocked: response?.payload?.data?.data?.isCategoryBlocked,
          })
        );
        toast.success(response?.payload?.data?.message);
        setIsConfirmationOpenCategory(false);
      } else {
        toast.error(response?.payload?.response.data?.message);
        setIsConfirmationOpenCategory(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelModal = () => {
    setIsConfirmationOpenMultiple(false);
    updatedDataHereNow = updatedDataHereNow?.map((data) => {
      return {
        ...data,
        isChecked: data?.isProductBlocked,
      };
    });
    dispatch(restoreProductonCancel(updatedDataHereNow));
    setSelectedProducts([]);
  };

  const handleUpdateCommission = async (values) => {
    try {
      let payload = {
        ...commissionValue,
        value: values.commission,
      };
      let response = await dispatch(UpdateCommissionStoreProducts(payload));
      if (response?.payload?.status === 200) {
        dispatch(updateProductCommision(response?.payload?.data?.data));
        toast.success(response?.payload?.data?.message);
        setOpenCommissionModal(false);
      } else {
        toast.error(response?.payload?.response.data?.message);
        setOpenCommissionModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCommsissionChange = (payload) => {
    const payloadData = {
      storeId: id,
      product: payload.id,
    };
    setOpenCommissionModal(true);
    setCommissionValue(payloadData);
  };

  let viewStoreDataFilter = viewStoreData?.storeProducts
    ?.filter((products) => {
      if (selectedCategoryValues?.includes("All")) {
        return products;
      } else if (selectedCategoryValues === products?.categoryId?._id) {
        return products;
      }
    })
    ?.filter((data) => {
      if (blockActiveValues == "All") {
        return data;
      } else if (blockActiveValues == data?.isProductBlocked) {
        return data;
      }
    });

  if (isViewStoreLoader) {
    return (
      <div className="min-h-[calc(100vh-150px)] flex items-center justify-center">
        <div className="min-h-[300px] flex items-center justify-center largeLorder">
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-1">
        <Card className="xl:col-span-2 border border-blue-gray-100 shadow-sm mt-12">
          <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6 bg-gradient-to-tr from-[#9b1b26] to-[#fb8102] text-white flex justify-between items-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white"
            >
              {viewStoreData?.storeName}
            </Typography>
          </div>
          <CardBody className="md:p-6 p-3">
            <div className="flex justify-between gap-4 w-full m-auto items-start md:flex-nowrap flex-wrap">
              <div className="lg:w-8/12">
                <div className="flex items-start flex-nowrap gap-4 mb-1">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="w-[70px]"
                  >
                    City:
                  </Typography>
                  <Typography className="w-full">
                    {viewStoreData?.city}
                  </Typography>
                </div>
                <div className="flex items-start flex-nowrap gap-4 mb-1">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="w-[70px]"
                  >
                    Type:
                  </Typography>
                  <Typography className="w-full">
                    {viewStoreData?.createdBy?.userType}
                  </Typography>
                </div>
                <div className="flex items-start flex-nowrap gap-4 mb-1">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="w-[70px]"
                  >
                    Name:{" "}
                  </Typography>
                  <Typography className="w-full">
                    {viewStoreData?.createdBy?.firstName +
                      " " +
                      viewStoreData?.createdBy?.lastName}
                  </Typography>
                </div>
                <div className="flex items-start flex-nowrap gap-4 mb-1">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="w-[70px]"
                  >
                    email:
                  </Typography>
                  <Typography className="w-full">
                    {viewStoreData?.createdBy?.email}
                  </Typography>
                </div>
                {viewStoreData?.createdBy?.phoneNumber && (
                  <div className="flex items-start flex-nowrap gap-4 mb-1">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="w-[70px]"
                    >
                      Phone:
                    </Typography>
                    <Typography className="w-full">
                      {viewStoreData?.createdBy?.phoneNumber}
                    </Typography>
                  </div>
                )}

                <div className="flex items-start flex-nowrap gap-4 mb-1">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="w-[70px]"
                  >
                    ZipCode:
                  </Typography>
                  <Typography className="w-full">
                    {viewStoreData?.createdBy?.zipcode}
                  </Typography>
                </div>
                {viewStoreData?.storeAddress && (
                  <div className="flex items-start flex-nowrap gap-4 mb-1">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="w-[70px]"
                    >
                      Address:
                    </Typography>
                    <Typography className="w-[calc(100%-70px)] max-w-xs">
                      {`${viewStoreData?.storeAddress?.house_number} ${viewStoreData?.storeAddress?.road} ,${viewStoreData?.storeAddress?.village} ${viewStoreData?.storeAddress?.municipality} , ${viewStoreData?.storeAddress?.county} ${viewStoreData?.storeAddress?.state}  ${viewStoreData?.storeAddress?.country}  `}
                    </Typography>
                  </div>
                )}
              </div>

              <div className="store_image w-full lg:w-3/12">
                <img
                  src={viewStoreData?.logo}
                  className="rounded-md w-full"
                  alt=""
                />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between md:p-6 p-3"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Categories
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="md:p-6 p-3 pb-6 md:pt-0 pt-0">
            {viewStoreData?.categories?.length == 1 ? (
              <h1 className="text-[#788895] font-[18px] p-7 text-center border border-dashed border-[#d4dee9] rounded">
                There are no product categories available at the moment.
              </h1>
            ) : (
              <div className="slick_slide">
                {viewStoreData?.categories?.length > 1 && (
                  <Slider
                    {...settings}
                    className="gap-5"
                    style={{ gap: "20px" }}
                  >
                    {viewStoreData?.categories?.map((data, key) => {
                      return (
                        <div className="flex">
                          <Card
                            key={key}
                            className={`md:p-4 p-3 border min-h-[105px] flex justify-center border-blue-gray-100 max-w-[calc(100%-20px)] mx-auto ${
                              data?.isCategorySelected && "bg-[#f2a463]"
                            }`}
                            onClick={() => {
                              dispatch(categoryCheckUnCheck(data?._id));
                              setSelectedCategoryValues(
                                data?._id || data?.categoryName
                              );
                            }}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                {!data?.categoryName.includes("All") && (
                                  <div className="image_wrapper w-[85px] h-[70px] grow-0 basis-[85px] shrink-0 rounded-md overflow-hidden">
                                    <img
                                      src={data?.logo}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}

                                <Typography
                                  className={`text-lg font-bold ${
                                    data.categoryName.includes("All") &&
                                    "text-center"
                                  }`}
                                >
                                  {data?.categoryName}
                                </Typography>
                              </div>
                              {!data?.categoryName.includes("All") && (
                                <Switch
                                  checked={data?.isCategoryBlocked}
                                  onChange={() => {
                                    handleCategoryModalOpen({
                                      categoryId: data?._id,
                                      userId: data?.createdBy,
                                      isCategoryBlocked: !data?.isCategoryBlocked,
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </Card>
                        </div>
                      );
                    })}
                  </Slider>
                )}
              </div>
            )}
          </CardBody>
        </Card>
        <Card className="xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between md:p-6 p-3 overflow-visible"
          >
            <div className="flex items-center gap-2 justify-between min-h-14 w-full">
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Products
              </Typography>
              <div className="flex items-center justify-end w-full gap-5 px-2 py-1">
                {selectedProducts?.length > 0 && (
                  <Button
                    color="red"
                    onClick={() => {
                      setIsConfirmationOpenMultiple(true);
                    }}
                  >
                    Update
                  </Button>
                )}

                <div className="smallInput">
                  <Select
                    label="Sort by Active/Block"
                    color="lightBlue"
                    placement="bottom-start"
                    buttonText="Select a user"
                    buttonType="filled"
                    size="regular"
                    rounded={false}
                    block={false}
                    ripple="light"
                    onChange={(e) => {
                      setBlockActiveValues(e);
                    }}
                  >
                    <Option value={"All"}>All</Option>
                    <Option value={true}>Block</Option>
                    <Option value={false}>Unblock</Option>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="md:p-6 p-3 md:pt-0 pt-0 overflow-x-auto">
            <table className=" w-full  min-w-[600px]  table-auto">
              <thead>
                <tr>
                  {[
                    "",
                    "Product",
                    "Description",
                    "Price",
                    "Product Quantity",
                    "Commission(%)",
                    "Commission Amount",
                    "Status",
                    "Action",
                  ].map((element) => (
                    <th
                      key={element}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left whitespace-nowrap"
                    >
                      <Typography
                        variant="small"
                        className="text-[12px] font-bold uppercase text-black"
                      >
                        {element}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              {viewStoreData?.storeProducts?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={8}>
                      <h1 className="text-[#788895] font-[18px] p-7 text-center border border-dashed border-[#d4dee9] rounded">
                        There is no information available regarding the details
                        of the products.
                      </h1>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <>
                    {viewStoreDataFilter?.length > 0 ? (
                      <>
                        {viewStoreDataFilter?.map((data, key) => {
                          return (
                            <tr key={id} className="tableHover text-black">
                              <td className="py-3 px-5">
                                <Typography>
                                  <Checkbox
                                    color="blue"
                                    onChange={(e) => {
                                      handleProductSelection(data, data?._id);
                                      dispatch(
                                        productCheckUnCheck({
                                          _id: data?._id,
                                          isChecked: data?.isChecked,
                                        })
                                      );
                                    }}
                                    checked={data?.isChecked}
                                  />
                                </Typography>
                              </td>
                              <td className="py-3 px-5 text-black">
                                <div className="flex items-center gap-4">
                                  <div className="image_logo_wrapper rounded-[50%] basis-[48px] grow-0 shrink-0 w-12 h-12 overflow-hidden text-black">
                                    <img
                                      className="object-cover w-full h-full"
                                      src={data?.productImage}
                                      alt=""
                                    />
                                  </div>
                                  <Typography
                                    variant="small"
                                    className="text-l font-medium text-[#000000]"
                                  >
                                    {data?.productName}
                                  </Typography>
                                </div>
                              </td>
                              <td className="py-3 px-5">
                                <Typography
                                  variant="small"
                                  className="text-l font-medium text-[#000000]"
                                >
                                  {data?.productDescription}
                                </Typography>
                              </td>
                              <td className="py-3 px-5">
                                {" "}
                                <Typography
                                  variant="small"
                                  className="text-l font-medium text-[#000000]"
                                >
                                  €{data?.productPrice}
                                </Typography>
                              </td>
                              <td className="py-3 px-5">
                                {" "}
                                <Typography
                                  variant="small"
                                  className="text-l font-medium text-[#000000]"
                                >
                                  {data?.productQuantity}
                                </Typography>
                              </td>
                              <td className="py-3 px-5">
                                {" "}
                                <Typography
                                  variant="small"
                                  className="text-l font-medium text-[#000000]"
                                >
                                  {data?.commissionPercentage}%{" "}
                                </Typography>
                              </td>
                              <td className="py-3 px-5">
                                {" "}
                                <Typography
                                  variant="small"
                                  className="text-l font-medium text-[#000000]"
                                >
                                  €{data?.commissionAmount}{" "}
                                </Typography>
                              </td>
                              <td className="py-3 px-5">
                                {" "}
                                <Typography variant="small">
                                  {data?.isProductBlocked ? (
                                    <span
                                      style={{
                                        backgroundColor: "black",
                                        padding: "3px 7px",
                                        color: "white",
                                        borderRadius: "7px",
                                      }}
                                    >
                                      Blocked
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        backgroundColor: "green",
                                        padding: "3px 7px",
                                        color: "white",
                                        borderRadius: "7px",
                                      }}
                                    >
                                      Active
                                    </span>
                                  )}
                                </Typography>
                              </td>
                              <td className="py-3 px-5">
                                <Button
                                  color="green"
                                  onClick={async () => {
                                    formik.setFieldValue(
                                      "commission",
                                      data?.commissionPercentage
                                    );
                                    handleCommsissionChange({
                                      id: data._id,
                                    });
                                    setCommissionValue({
                                      storeId: id,
                                      productId: data._id,
                                      value: formik.values.commission,
                                    });
                                  }}
                                  disabled={
                                    data?.isProductBlocked || data.isChecked
                                  }
                                >
                                  Update
                                </Button>
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
                </tbody>
              )}
            </table>
          </CardBody>
          <CommsionModal
            setOpen={setOpenCommissionModal}
            open={openCommissionModal}
            formik={formik}
            showError={showError}
            isCommissionLoader={isCommissionLoader}
          />
          <ConfirmationModal
            setOpen={setIsConfirmationOpen}
            open={isConfirmationOpen}
            heading={
              !blockProductValues?.isProductBlocked ? "UnBlock" : "Block"
            }
            handleConfirm={handleProductBlockStatus}
            Loader={isProductBlockedLoader}
            buttonColor={"red"}
            buttonIcon={<MdBlock />}
          />
          <ConfirmationModal
            setOpen={setIsConfirmationOpenMultiple}
            open={isConfirmationOpenMultiple}
            heading={"Update"}
            handleConfirm={handleBlockMultiple}
            handleCancel={handleCancelModal}
            Loader={isMultipleStoreLoader}
            buttonColor={"red"}
            buttonIcon={<MdBlock />}
          />
          <ConfirmationModal
            setOpen={setIsConfirmationOpenCategory}
            open={isConfirmationOpenCategory}
            heading={!categoriesValues?.isCategoryBlocked ? "UnBlock" : "Block"}
            handleConfirm={handleBlockCategory}
            Loader={isCategoryBlockLoader}
            buttonColor={"red"}
            buttonIcon={<MdBlock />}
          />
        </Card>
      </div>
    </div>
  );
};

export default ViewStore;
