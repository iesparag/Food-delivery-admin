import CountUpComponent from "@/component/countUpComponent/countUpComponent";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export function StatisticsCard({ color, icon, title, value, footer }) {
  const { isdashboardLoader } = useSelector((state) => state.dashboardStore);
  return (
    <Card className="border p-4 border-blue-gray-100 shadow-sm flex items-center justify-between flex-row">
      <CardHeader
        variant="gradient"
        color={color}
        floated={false}
        shadow={false}
        className="grid h-16 w-16 place-items-center bg-gradient-to-tr from-[#9b1b26] to-[#fb8102] m-0"
      >
        {icon}
      </CardHeader>
      <CardBody className="text-right p-0">
        <Typography variant="small" className="font-normal text-[#9f9696]">
          {title}
        </Typography>
        {isdashboardLoader ? (
          <Typography variant="h4" color="blue-gray text-2xl">
            0
          </Typography>
        ) : (
          <Typography variant="h4" color="blue-gray text-2xl">
            <CountUpComponent key={value} targetNumber={value} />
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
