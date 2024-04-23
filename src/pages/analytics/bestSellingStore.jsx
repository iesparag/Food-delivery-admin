import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import React, { memo } from "react";
import { Loader } from "@/component/loader/loader";
const BestSellingStores = ({
  isTopStoreLoader,
  topStoreData,
  setSearchCity,
  searchCity,
  fetchTopSellingStore,
}) => {
  return (
    <Card>
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-8 p-6 bg-gradient-to-tr from-[#9b1b26] to-[#fb8102] text-white h-[95px]"
      >
        <Typography variant="h6" color="white">
          Best Selling Stores
        </Typography>
      </CardHeader>
      <div className="w-full mb-4 px-4">
        <div className="flex justify-end space-x-4">
          <Input
            label="Search By City"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-72"
          />

          <Button
            color="green"
            disabled={!searchCity.length > 0}
            onClick={() => {
              fetchTopSellingStore();
            }}
          >
            Search
          </Button>
        </div>
      </div>
      <CardBody className="overflow-x-auto px-0 pt-0 pb-2 h-full">
        <table className=" w-full  min-w-[600px]  table-auto">
          <thead>
            <tr>
              {["Store Location", "Store name", "total quantity"].map((el) => (
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
              ))}
            </tr>
          </thead>
          <tbody>
            {isTopStoreLoader ? (
              <tr>
                <td colSpan={3}>
                  <div className="min-h-[300px] flex items-center justify-center largeLorder">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {topStoreData.length > 0 ? (
                  <>
                    {topStoreData?.map(
                      ({ storeLocation, storeName, totalQuantity }, key) => {
                        const className = `py-3 px-5 ${
                          key === topStoreData?.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={name}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <div>
                                  <Typography
                                    variant="small"
                                    className="text-l font-medium text-[#000000]"
                                  >
                                    {storeLocation}
                                  </Typography>
                                </div>
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
  );
};

export default memo(BestSellingStores);
