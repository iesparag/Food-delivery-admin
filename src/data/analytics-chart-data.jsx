import { Loader } from "@/component/loader/loader";
import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const pieData = {
  series: [4895, 4580, 300],
  chartOptions: {
    labels: ["orders", "orders completed", "orders cancelled"],
    pie: {
      customScale: 0.75,
      offsetY: -40,
    },
    legend: {
      position: "top",
    },
  },
};
export function AnalyticsChart() {
  const {
    MonthlyAnalytics,
    isAnalyticsLoader,
    MonthlyQunatities,
  } = useSelector((state) => state.analyticsSlice);
  let data = [...Object.entries(MonthlyAnalytics)].flat();
  let monthlyQuntites = [...Object.entries(MonthlyQunatities)].flat();

  let month = [];
  let MonthPrice = [];
  let MonthQuntities = [];
  data.forEach((data) => {
    if (typeof data === "string") {
      month.push(data);
    } else {
      MonthPrice.push(data);
    }
  });
  monthlyQuntites.forEach((data) => {
    if (typeof data === "number") {
      MonthQuntities.push(data);
    }
  });
  let objectWithPrice = MonthPrice.map((data) => {
    return {
      monthPrice: data,
    };
  });
  let finalizedArray = objectWithPrice.map((data, key) => {
    return { ...data, monthQuantity: MonthQuntities[key] };
  });
  finalizedArray = finalizedArray.map((data, key) => {
    return { ...data, month: month[key] };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip bg-[#e3e3e3] p-3 rounded-sm"
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <p>{`Month : ${label}`}</p>
          <p>{`Price : ${payload[0].value}`}</p>
          <p>{`Quantity : ${payload?.[0]?.payload?.monthQuantity}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="border border-solid border-[#ddd] rounded-lg p-6">
        {isAnalyticsLoader ? (
          <div className="min-h-[300px] flex items-center justify-center largeLorder">
            <Loader />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%" minHeight={"200px"}>
            <AreaChart
              width={500}
              height={400}
              data={finalizedArray}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
              defaultShowTooltip={true}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="monthPrice"
                stroke="#8884d8"
                fill="#ff7f00"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="border border-solid border-[#ddd] rounded-lg p-6 flex flex-col items-center">
        <h5 className="text-base font-bold mb-4 text-black text-left w-full ">
          Year Sales
        </h5>
        <Chart
          options={pieData.chartOptions}
          series={pieData.series}
          type="pie"
          width={380}
        />
      </div>
    </div>
  );
}
export default AnalyticsChart;
