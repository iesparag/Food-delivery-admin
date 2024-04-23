import {
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Customer from "./pages/customer";
import { AdminStore } from "./pages/adminStores/adminStore";
import ViewStore from "./pages/adminStores/viewStore";
import Orders from "./pages/orders";
import Analytics from "./pages/analytics";
import { BiStore } from "react-icons/bi";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdShoppingCartCheckout } from "react-icons/md";
import OrderDetail from "./pages/orders/orderDetail";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "customers",
        path: "/customer",
        element: <Customer />,
      },
      {
        icon: <BiStore {...icon} />,
        name: "store",
        path: "/store",
        element: <AdminStore />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "viewStore",
        path: "/store/:id",
        element: <ViewStore />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "orderDetails",
        path: "/orders/:id",
        element: <OrderDetail />,
      },
      {
        icon: <MdShoppingCartCheckout {...icon} />,
        name: "Orders",
        path: "/orders",
        element: <Orders />,
      },
      {
        icon: <IoAnalyticsOutline {...icon} />,
        name: "Analytics",
        path: "/analytics",
        element: <Analytics />,
      },
    ],
  },
  {
    layout: "auth",
    pages: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
