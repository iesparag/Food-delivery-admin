import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { BiCartDownload } from "react-icons/bi";
import { PiUsersThreeFill } from "react-icons/pi";
import { Icon } from "@iconify/react";
import totalOrders from "../../assets/orders-icon.svg";
export const statisticsCardsData = [
  {
    color: "gray",
    icon: BiCartDownload,
    title: "Total Orders",
    value: "10",
    footer: {
      color: "text-green-500",
      // value: "+55%",
      // label: "than last week",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Total's Customer",
    value: "15",
    footer: {
      color: "text-green-500",
      // value: "+3%",
      // label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Total Products",
    value: "250",
    footer: {
      color: "text-red-500",
      // value: "-2%",
      // label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Active Order",
    value: "00",
    footer: {
      color: "text-green-500",
      // value: "+5%",
      // label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
