import AnalyticsChart from "@/data/analytics-chart-data";
import {
  getMonthlyStatisticData,
  getTopSellingProducts,
  getTopSellingStores,
} from "@/store/slices/analytics/analyticsSlice";
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BestSellingStores from "./bestSellingStore";
import { Loader } from "@/component/loader/loader";

const Analytics = () => {
  const [searchCity, setSearchCity] = useState("");
  const dispatch = useDispatch();
  let currentYears = new Date().getFullYear();
  const {
    isTopProductsLoader,
    topProductsData,
    isTopStoreLoader,
    topStoreData,
  } = useSelector((state) => state.analyticsSlice);

  const [currentYear, setCurrentYear] = useState(2024);
  const fetchAnalyticsData = async () => {
    try {
      const response = await dispatch(getMonthlyStatisticData(currentYear));
    } catch (error) {
      console.log(error);
      throw Error;
    }
  };

  const fetchTopSellingProducts = async () => {
    try {
      await dispatch(getTopSellingProducts());
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTopSellingStore = async () => {
    try {
      await dispatch(getTopSellingStores(searchCity));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAnalyticsData();
  }, [currentYear]);
  useEffect(() => {
    fetchTopSellingProducts();
    fetchTopSellingStore();
  }, []);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 min-h-[calc(100vh-220px)]">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 bg-gradient-to-tr from-[#9b1b26] to-[#fb8102] text-white flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Analytics
          </Typography>
        </CardHeader>

        <CardBody className="mt-0 pt-0">
          <div className="flex items-center flex-wrap justify-between gap-5 w-full mb-4">
            <h4 className="font-sans text-xl font-semibold leading-relaxed text-blue-gray-900 mb-0">
              Sales Statistics
            </h4>
            <div className="smallInput">
              <Select
                label="Sort by Year"
                color="lightBlue"
                placement="bottom-start"
                buttonText="Select a user"
                buttonType="filled"
                size="regular"
                rounded={false}
                block={false}
                ripple="light"
                onChange={(e) => {
                  setCurrentYear(e);
                }}
                value={currentYears}
              >
                <Option value={currentYears}>{currentYears}</Option>
                <Option value={2023}>2023</Option>
                <Option value={2022}>2022</Option>
              </Select>
            </div>
          </div>

          <AnalyticsChart />
        </CardBody>
      </Card>
      <div className="block lg:grid lg:grid-cols-2 gap-12 lg:gap-6">
        <Card className="mb-10 lg:mb-0">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-8 p-6 bg-gradient-to-tr from-[#9b1b26] to-[#fb8102] text-white"
          >
            <Typography variant="h6" color="white">
              Best Selling Products
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
            <table className=" w-full  min-w-[600px]  table-auto">
              <thead>
                <tr>
                  {["product name", "product price", "total Selling Qty."].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left whitespace-nowrap"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-[#000000]"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {isTopProductsLoader ? (
                  <tr>
                    <td colSpan={3}>
                      <div className="min-h-[300px] flex items-center justify-center largeLorder">
                        <Loader />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {topProductsData?.length > 0 ? (
                      <>
                        {topProductsData?.map(
                          (
                            { productName, productPrice, totalQuantity },
                            key
                          ) => {
                            const className = `py-3 px-5 ${
                              key === topProductsData?.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                            }`;

                            return (
                              <tr key={name} className="text-black">
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="text-l font-medium text-[#000000]"
                                  >
                                    {productName}
                                  </Typography>
                                </td>

                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="text-l font-medium text-[#000000]"
                                  >
                                    {productPrice}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="text-l font-medium text-[#000000]"
                                  >
                                    {totalQuantity}
                                  </Typography>
                                </td>
                              </tr>
                            );
                          }
                        )}
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
              </tbody>
            </table>
          </CardBody>
        </Card>
        <BestSellingStores
          topStoreData={topStoreData}
          isTopStoreLoader={isTopStoreLoader}
          setSearchCity={setSearchCity}
          searchCity={searchCity}
          fetchTopSellingStore={fetchTopSellingStore}
        />
      </div>
    </div>
  );
};

export default Analytics;
