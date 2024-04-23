import { Loader } from "@/component/loader/loader";
import { formatDate } from "@/utils/FormatDates";
import React from "react";
import {
  Typography,
  Select,
  Option,
  Switch,
  Badge,
} from "@material-tailwind/react";

const CustomerTable = ({
  isLoading,
  customerData,
  handleBlockModalOpen,
  userRoleValue,
  handleUpdateRoleChange,
  handleApproveModalOpen,
}) => {
  return (
    <div>
      <table className=" w-full  min-w-[600px]  table-auto">
        <thead>
          <tr>
            {[
              "#",
              "Name",
              "email",
              "role",
              "created Date",
              "Approved",
              "Block/Unblock",
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
              <td colSpan={7}>
                <div className="min-h-[300px] flex items-center justify-center largeLorder">
                  <Loader />
                </div>
              </td>
            </tr>
          ) : (
            <>
              {!customerData || customerData?.length == 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="img_wrap w-full p-4 m-auto">
                      <h1 className="text-[#788895] font-[18px] p-7 text-center border border-dashed border-[#d4dee9] rounded">
                        No Results
                      </h1>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {customerData
                    ?.filter((data) => {
                      if (userRoleValue == "all") {
                        return data;
                      } else if (data.userType == userRoleValue) {
                        return data;
                      }
                    })
                    .map(
                      (
                        {
                          firstName,
                          lastName,
                          email,
                          _id,
                          createdAt,
                          userType,
                          isUserBlocked,
                          isSellerAccountApproved,
                        },
                        key
                      ) => {
                        const className = `py-3 px-5 ${
                          key === customerData?.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={_id} className="tableHover">
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-[#9f9696]"
                              >
                                #
                              </Typography>
                            </td>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="text-l font-medium text-[#000000]"
                                >
                                  {`${firstName} ${lastName}`}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-l font-medium text-[#000000]"
                              >
                                {email}
                              </Typography>
                            </td>
                            <td className={className}>
                              <div className="smallInput">
                                <Select
                                  label="Select Role"
                                  value={
                                    userType?.charAt(0)?.toUpperCase() +
                                    userType?.slice(1)
                                  }
                                  name="userType"
                                >
                                  {["seller", "buyer"].map((option) => {
                                    return (
                                      <Option
                                        value={option}
                                        disabled={userType == option}
                                        onMouseDown={(e) => {
                                          handleUpdateRoleChange(e, {
                                            id: _id,
                                            role: option,
                                          });
                                        }}
                                      >
                                        {option.charAt(0).toUpperCase() +
                                          option.slice(1)}
                                      </Option>
                                    );
                                  })}
                                </Select>
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
                              <Typography
                                variant="small"
                                className="text-l font-medium text-[#000000]"
                              >
                                {userType == "seller" ? (
                                  <>
                                    {!isSellerAccountApproved ? (
                                      <Switch
                                        checked={isSellerAccountApproved}
                                        disabled={isSellerAccountApproved}
                                        onChange={(e) => {
                                          handleApproveModalOpen({
                                            id: _id,
                                            isSellerAccountApproved: !isSellerAccountApproved,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <Badge color="green"></Badge>
                                    )}
                                  </>
                                ) : (
                                  "-"
                                )}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-l font-medium text-[#000000]"
                              >
                                <Switch
                                  checked={isUserBlocked}
                                  onChange={(e) => {
                                    handleBlockModalOpen({
                                      id: _id,
                                      isUserBlocked: !isUserBlocked,
                                    });
                                  }}
                                />
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )}
                </>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
