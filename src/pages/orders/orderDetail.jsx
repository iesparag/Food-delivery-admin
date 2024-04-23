import React, { useEffect } from "react";
import { fetchSingleOrdersData } from "@/store/slices/orders/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Loader } from "@/component/loader/loader";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { viewOrderData, isViewStoreLoader } = useSelector(
    (state) => state?.orderStore
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchSingleOrdersData(id));
    };
    fetchData();
  }, []);
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
    <div className="min-h-[calc(100vh-150px)] grid grid-cols-1 lg:grid-cols-5 gap-6 mt-3">
      <div className="mb-4 lg:col-span-3 grid grid-cols-1 gap-6 xl:grid-cols-1">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center flex-wrap justify-between md:p-6 p-3"
          >
            <div>
              <Typography variant="h4" color="blue-gray" className="mb-1">
                Order #{viewOrderData?._id ? viewOrderData?._id : "N/A"}
              </Typography>
              <Typography variant="h6" color="gray" className="mb-1">
                Contact :
                {viewOrderData?.mobileNumber
                  ? viewOrderData?.mobileNumber
                  : "N/A"}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="gray" className="mb-1">
                Order Status :
                {viewOrderData?.status
                  ? viewOrderData?.status?.charAt(0)?.toUpperCase() +
                    viewOrderData?.status?.slice(1)
                  : "N/A"}
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="md:p-6 p-3">
            <div className="w-full flex justify-between items-center gap-4 flex-row shadow-none mb-2">
              <div className="w-full flex gap-4 flex-row items-center shadow-none">
                Product
              </div>
              <div className="flex gap-4 flex-row items-center">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal min-w-[60px] text-center">
                  Quantity
                </p>
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal min-w-[120px] text-right">
                  Price
                </p>
              </div>
            </div>
            <div className="flex justify-between flex-col gap-4 w-full m-auto md:flex-nowrap flex-wrap max-h-[380px] overflow-y-auto overflow-x-hidden customScroll">
              {viewOrderData?.items?.map((items, index) => {
                return (
                  <div className="card_items_ordered_wrapper w-full m-auto pr-3">
                    <div className="w-full flex justify-between items-center gap-4 flex-row shadow-none">
                      <div className="w-full flex gap-4 flex-row items-center shadow-none">
                        <img
                          src={items?.product?.productImage}
                          alt="card-image"
                          className="w-20 h-14 object-cover rounded-lg"
                        />
                        <div className="calc(100%-130px)">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {items?.product?.productName
                              ? items?.product?.productName
                              : "N/A"}
                          </Typography>
                        </div>
                      </div>
                      <div className="flex gap-4 flex-row items-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal min-w-[60px] text-center"
                        >
                          {items?.quantity ? items?.quantity : "N/A"}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal min-w-[120px] text-right"
                        >
                          €{items?.price ? items?.price : "N/A"}
                        </Typography>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <div className="flex justify-between gap-3 flex-col mt-6">
              <div className="total_details flex gap-5 justify-between">
                <h5>Cart Item Price:</h5>
                <h6>
                  €{viewOrderData?.amount ? viewOrderData?.amount : "N/A"}
                </h6>
              </div>
              <div className="total_details flex gap-5 justify-between">
                <h5>Shipping Cost:</h5>
                <h6>
                  {viewOrderData?.shipping_cost?.amount_total
                    ? `€ ${viewOrderData?.shipping_cost?.amount_total}`
                    : "N/A"}
                </h6>
              </div>

              <div className=" flex gap-4 justify-between">
                <h5 className="font-bold">Total Price:</h5>
                <h6 className="font-bold">
                  €
                  {viewOrderData?.totalPrice
                    ? viewOrderData?.totalPrice
                    : "N/A"}
                </h6>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardBody className="md:p-6 p-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="text-lg mb-5"
                  >
                    Payment
                  </Typography>
                </div>
                <div className="City flex gap-3">
                  <Typography
                    variant="h6"
                    color="gray"
                    className="mb-1 font-medium"
                  >
                    Payment Method:
                  </Typography>
                  {viewOrderData?.payment?.method
                    ? viewOrderData?.payment?.method
                    : "N/A"}
                </div>

                <div className="City flex gap-3">
                  <Typography
                    variant="h6"
                    color="gray"
                    className="mb-1 font-medium"
                  >
                    Payment Status:
                  </Typography>
                  {viewOrderData?.payment?.status
                    ? viewOrderData?.payment?.status
                    : "N/A"}
                </div>

                <div className="City flex gap-3">
                  <Typography
                    variant="h6"
                    color="gray"
                    className="mb-1 font-medium"
                  >
                    TransactionId:
                  </Typography>
                  <span className="break-all">
                    {viewOrderData?.payment?.transactionId
                      ? viewOrderData?.payment?.transactionId
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="text-lg mb-5"
                  >
                    Stripe Customer Detail
                  </Typography>
                </div>
                <div className="transactionID flex gap-3">
                  <Typography
                    variant="h6"
                    color="gray"
                    className="mb-1 font-medium"
                  >
                    Email:
                  </Typography>
                  {viewOrderData?.stripeCustomerDetail?.email
                    ? viewOrderData?.stripeCustomerDetail?.email
                    : "N/A"}
                </div>
                <div className="transactionID flex gap-3">
                  <Typography
                    variant="h6"
                    color="gray"
                    className="mb-1 font-medium"
                  >
                    Stripe Customer Id:
                  </Typography>
                  <Typography className="ml-3">
                    {viewOrderData?.stripeCustomerDetail?.stripeCustomerId
                      ? viewOrderData?.stripeCustomerDetail?.stripeCustomerId
                      : "N/A"}
                  </Typography>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between md:p-6 p-3"
          >
            <div>
              <Typography
                variant="h6"
                color="blue-gray"
                className="text-lg mb-1"
              >
                Delivery Detail
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="md:p-6 p-3 md:pt-0 pt-0 grid gap-1">
            <div className="DeliveryAddress flex gap-3">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-medium"
              >
                Delivery Address:
              </Typography>
              {`${viewOrderData?.shipping?.address?.line1} 
                ${
                  viewOrderData?.shipping?.address?.line2
                    ? viewOrderData?.shipping?.address?.line2
                    : ""
                }`}
            </div>

            {viewOrderData?.shipping?.address?.city && (
              <div className="City flex gap-3">
                <Typography
                  variant="h6"
                  color="gray"
                  className="mb-1 font-medium"
                >
                  City:
                </Typography>
                {viewOrderData?.shipping?.address?.city
                  ? viewOrderData?.shipping?.address?.city
                  : "N/A"}
              </div>
            )}

            <div className="City flex gap-3">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-medium"
              >
                Email:
              </Typography>
              {viewOrderData?.stripeCustomerDetail?.email
                ? viewOrderData?.stripeCustomerDetail?.email
                : "N/A"}
            </div>

            <div className="City flex gap-3">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-medium"
              >
                Name:
              </Typography>
              {viewOrderData?.shipping?.name
                ? viewOrderData?.shipping?.name
                : "N/A"}
            </div>

            <div className="City flex gap-3">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-medium"
              >
                Phone Number:
              </Typography>
              {viewOrderData?.shipping?.phone
                ? viewOrderData?.shipping?.phone
                : "N/A"}
            </div>

            <div className="City flex gap-3">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-medium"
              >
                Postal Code:
              </Typography>
              {viewOrderData?.shipping?.address?.postal_code
                ? viewOrderData?.shipping?.address?.postal_code
                : "N/A"}
            </div>

            <div className="City flex gap-3">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-medium"
              >
                State:
              </Typography>
              {viewOrderData?.shipping?.address?.state
                ? viewOrderData?.shipping?.address?.state
                : "N/A"}
            </div>

            <div className="City flex gap-3">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-medium"
              >
                Delivery Instruction:
              </Typography>
              {viewOrderData?.deliveryInstruction
                ? viewOrderData?.deliveryInstruction
                : "N/A"}
            </div>

            <div className="City flex gap-3">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-medium"
              >
                Delivery Time:
              </Typography>
              {viewOrderData?.deliveryTime?.startTime +
                " - " +
                viewOrderData?.deliveryTime?.endTime}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetail;
