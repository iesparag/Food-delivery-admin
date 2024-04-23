import React, { useEffect, useState } from "react";
import { fetchOrdersData } from "@/store/slices/orders/ordersSlice";
import {
  Card,
  CardBody,
  CardHeader,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/component/loader/loader";
import Pagination from "@/component/pagination/pagination";
const Orders = () => {
  const dispatch = useDispatch();
  const { ordersData, isLoading, totalOrders } = useSelector(
    (state) => state?.orderStore
  );
  const [page, setPage] = useState(1);
  const [shipmentValues, setShipmentValues] = useState("All");
  const [paymentValues, setPaymentValues] = useState("All");
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchOrdersData(page));
    };
    fetchData();
  }, [page]);

  let ordersDataFilter = ordersData
    ?.filter((data) => {
      if (shipmentValues == "All") {
        return data;
      } else if (shipmentValues == data?.status) {
        return data;
      }
    })
    ?.filter((data) => {
      if (paymentValues == "All") {
        return data;
      } else if (paymentValues == data?.payment?.status) {
        return data;
      }
    });
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 min-h-[calc(100vh-220px)]">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 bg-gradient-to-tr from-[#9b1b26] to-[#fb8102] text-white flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Orders
          </Typography>
        </CardHeader>

        <CardBody className="overflow-x-auto px-5 pt-1 pb-2">
          <div className="flex justify-end items-center gap-4 mb-5 flex-wrap">
            <div className="max-w-[250px]">
              <Select
                label="Sort by Shipment Status"
                color="lightBlue"
                placement="bottom-start"
                buttonText="Select a user"
                buttonType="filled"
                size="regular"
                rounded={false}
                block={false}
                ripple="light"
                onChange={(e) => {
                  setShipmentValues(e);
                }}
              >
                <Option value={"All"}>All</Option>
                <Option value={"placed"}>Placed</Option>
                <Option value={"pending"}>Pending</Option>
                <Option value={"cancelled"}>Cancelled</Option>
              </Select>
            </div>
            <div className="max-w-[250px]">
              <Select
                className="max-w-[250px]"
                label="Sort by Payment Status"
                color="lightBlue"
                placement="bottom-start"
                buttonText="Select a user"
                buttonType="filled"
                size="regular"
                rounded={false}
                block={false}
                ripple="light"
                onChange={(e) => {
                  setPaymentValues(e);
                }}
              >
                <Option value={"All"}>All</Option>
                <Option value={"paid"}>Paid</Option>
                <Option value={"refunded"}>Refunded</Option>
                {/* <Option value={"completed"}>Completed</Option> */}
              </Select>
            </div>
          </div>
          <table className=" w-full  min-w-[600px]  table-auto">
            <thead>
              <tr>
                {[
                  "#",
                  "Orders Number",
                  "customer name",
                  "customer email",
                  "Contact Number",
                  "delivery Time",
                  "shipment status",
                  "Payment Status",
                  "Total Amount",
                  "View",
                ].map((element) => (
                  <th
                    key={element}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
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
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={10}>
                    <div className="min-h-[300px] flex items-center justify-center largeLorder">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {!ordersData || ordersData?.length == 0 ? (
                    <tr>
                      <td colSpan={10}>
                        <div className="img_wrap w-full p-4 m-auto">
                          <h1 className="text-[#788895] font-[18px] p-7 text-center border border-dashed border-[#d4dee9] rounded">
                            No Results
                          </h1>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {ordersDataFilter?.length > 0 ? (
                        <>
                          {ordersDataFilter?.map((element, id) => {
                            return (
                              <tr key={id} className="tableHover">
                                <td className="py-3 px-5">#</td>
                                <td className="py-3 px-5">
                                  <Typography
                                    variant="small"
                                    className="text-l font-medium text-[#000000]"
                                  >
                                    {element?._id}
                                  </Typography>
                                </td>

                                <td className="py-3 px-5">
                                  <Typography
                                    variant="small"
                                    className="text-l font-medium text-[#000000]"
                                  >
                                    {element?.shipping?.name
                                      ? element?.shipping?.name
                                      : "N/A"}
                                  </Typography>
                                </td>
                                <td className="py-3 px-5">
                                  <Typography
                                    variant="small"
                                    className="text-l font-medium text-[#000000]"
                                  >
                                    {element?.stripeCustomerDetail?.email
                                      ? element?.stripeCustomerDetail?.email
                                      : "N/A"}
                                  </Typography>
                                </td>
                                <td className="py-3 px-5">
                                  <Typography
                                    variant="small"
                                    className="text-l font-medium text-[#000000]"
                                  >
                                    {element?.shipping?.phone
                                      ? element?.shipping?.phone
                                      : "N/A"}
                                  </Typography>
                                </td>
                                <td className="py-3 px-5">
                                  <Typography
                                    variant="small"
                                    className="text-l font-medium text-[#000000]"
                                  >
                                    {element?.deliveryTime?.startTime +
                                      " - " +
                                      element?.deliveryTime?.endTime}
                                  </Typography>
                                </td>
                                <td className="py-3 px-5">
                                  <div
                                    className={`flex justify-center items-center gap-2 bg-gray-300 rounded-full py-1 px-3 min-h-[30px] w-fit text-white text-sm ${
                                      element?.status === "pending"
                                        ? "bg-[#6eb3d5]"
                                        : element?.status === "cancelled"
                                        ? "bg-red-800"
                                        : "bg-green-800"
                                    }`}
                                  >
                                    <span className="border-2 border-white h-3 w-3 rounded-full"></span>
                                    {element?.status.charAt(0).toUpperCase() +
                                      element.status.slice(1)}
                                  </div>
                                </td>
                                <td className="py-3 px-5">
                                  <div
                                    className={`flex justify-center items-center gap-2 rounded-full min-h-[30px]	
                                        py-1 px-3 w-fit text-white text-sm ${
                                          element?.payment?.status === "paid"
                                            ? "bg-green-800 h-5 w-5 rounded-full"
                                            : "bg-[#6eb3d5]"
                                        }`}
                                  >
                                    <span className="border-2 border-white h-3 w-3 rounded-full"></span>
                                    {element?.payment?.status
                                      .charAt(0)
                                      .toUpperCase() +
                                      element?.payment?.status.slice(1)}
                                  </div>
                                </td>
                                <td className="py-3 px-5">
                                  <Typography
                                    variant="small"
                                    className="text-l font-medium text-[#000000]"
                                  >
                                    {element?.totalPrice
                                      ? ` €${element?.totalPrice}`
                                      : "N/A"}
                                  </Typography>
                                </td>
                                <td className="py-3 px-5">
                                  <IoEyeOutline
                                    className="cursor-pointer mr-[8px]"
                                    onClick={() => {
                                      navigate(
                                        `/dashboard/orders/${element?._id}`
                                      );
                                    }}
                                    size={30}
                                    color="#bd5e00"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={10}>
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
        </CardBody>
        <div className="pagination_wrapper float-right flex justify-end">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </Card>
    </div>
  );
};

export default Orders;
