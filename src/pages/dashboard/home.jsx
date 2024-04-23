import React, { useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import {
  ChartBarIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeeklyOrdersData,
  fetchTodaysOrdersData,
} from "@/store/slices/orders/ordersSlice";

import { fetchDashoboardCount } from "@/store/slices/dashboardStore/dashboardSlice";
import { Loader } from "@/component/loader/loader";
import { BiCartDownload } from "react-icons/bi";
export function Home() {
  const { weeklyOrderData, isWeeklyOrderLoader, todayOrderData } = useSelector(
    (state) => state?.orderStore
  );
  const { dashboardCountData } = useSelector((state) => state.dashboardStore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodaysOrdersData());
    dispatch(fetchDashoboardCount());
    dispatch(fetchWeeklyOrdersData());
  }, []);

  const statisticsCardsData = [
    {
      color: "gray",
      icon: BiCartDownload,
      title: "Total Orders",
      value: dashboardCountData?.totalOrders,
      footer: {
        color: "text-green-500",
      },
    },
    {
      color: "gray",
      icon: UsersIcon,
      title: "Buyer",
      value: dashboardCountData?.buyerCount,
      footer: {
        color: "text-green-500",
      },
    },
    {
      color: "gray",
      icon: UsersIcon,
      title: "Seller",
      value: dashboardCountData?.sellerCount,
      footer: {
        color: "text-green-500",
      },
    },
    {
      color: "gray",
      icon: UserPlusIcon,
      title: "Total Products",
      value: dashboardCountData?.totalStoreProducts,
      footer: {
        color: "text-red-500",
      },
    },
    {
      color: "gray",
      icon: ChartBarIcon,
      title: "Shiping Order Count",
      value: dashboardCountData?.shippingOrdersCount,
      footer: {
        color: "text-green-500",
      },
    },
  ];
  return (
    <div className="mt-12">
      <div className="mb-6 grid gap-y-4 md:gap-y-6 gap-x-6 md:grid-cols-2 xl:grid-cols-5">
        {statisticsCardsData?.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-8 h-8 text-white",
            })}
            footer={
              <Typography className="font-normal text-[#9f9696]">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-4 flex flex-col gap-6">
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                This Week Orders
              </Typography>
            </div>
          </CardHeader>

          <CardBody className="overflow-x-auto px-0 pt-0 pb-2 max-h-[350px] customScroll">
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
                {isWeeklyOrderLoader ? (
                  <tr>
                    <td colSpan={10}>
                      <div className="min-h-[300px] flex items-center justify-center largeLorder">
                        <Loader />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {!weeklyOrderData || weeklyOrderData?.length == 0 ? (
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
                        {weeklyOrderData?.map((element, id) => (
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
                                className={`flex justify-center items-center gap-2 bg-gray-300 rounded-full py-1 px-3 min-h-[30px] w-fit text-white text-sm  ${
                                  element?.status === "pending"
                                    ? "bg-[#6eb3d5]"
                                    : element?.status === "cancelled"
                                    ? "bg-red-800"
                                    : "bg-green-800"
                                }`}
                              >
                                <span className="border-2 border-white h-3 w-3 rounded-full"></span>
                                {element?.status.charAt(0).toUpperCase() +
                                  element?.status.slice(1)}
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
                                  ? `€${element?.totalPrice}`
                                  : "N/A"}
                              </Typography>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Today's Orders
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-auto px-0 pt-0 pb-2 max-h-[350px] customScroll">
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
                {isWeeklyOrderLoader ? (
                  <tr>
                    <td colSpan={10}>
                      <div className="min-h-[300px] flex items-center justify-center largeLorder">
                        <Loader />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {!todayOrderData || todayOrderData?.length == 0 ? (
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
                        {todayOrderData?.map((element, id) => (
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
                                className={`flex justify-center items-center gap-2 bg-gray-300 rounded-full py-1 px-3 min-h-[30px] w-fit text-white text-sm  ${
                                  element?.status === "pending"
                                    ? "bg-[#6eb3d5]"
                                    : element?.status === "cancelled"
                                    ? "bg-red-800"
                                    : "bg-green-800"
                                }`}
                              >
                                <span className="border-2 border-white h-3 w-3 rounded-full"></span>
                                {element?.status}
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
                                {element?.payment?.status}
                              </div>
                            </td>

                            <td className="py-3 px-5">
                              <Typography
                                variant="small"
                                className="text-l font-medium text-[#000000]"
                              >
                                €
                                {element?.totalPrice
                                  ? element?.totalPrice
                                  : "N/A"}
                              </Typography>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
