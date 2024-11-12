import {
  Home,
  BookStack,
  Settings,
  BellNotification,
  LogOut,
  User,
  List,
  UserCart,
  UTurnArrowLeft,
} from "iconoir-react";
import { MenuItem, ICollapsibleMenuItem } from "@/interfaces/MenuItem";

const title = "LOGO";

const managementItem: ICollapsibleMenuItem = {
  icon: <BookStack />,
  name: "Management",
  link: "",
  subItems: [
    { icon: <List />, name: "Product list", link: "/employee/product/list" },
    {
      icon: <UserCart />,
      name: "Orders",
      link: "/employee/order/list",
    },
  ],
};

const primaryGroup: MenuItem[] | ICollapsibleMenuItem[] = [
  { icon: <Home />, name: "Home page", link: "/employee/test" },
  // { icon: <BookStack />, name: "Zarządzanie", link: "/employee/product-list" },
  managementItem,
];

const secondaryGroup: MenuItem[] = [
  { icon: <Settings />, name: "Settings", link: "/employee/settings" },
  {
    icon: <BellNotification />,
    name: "Notifications",
    link: "/employee/notifications",
  },
];

const footerGroup: MenuItem[] = [
  { icon: <LogOut />, name: "Logout", link: "/employee/logout" },
  {
    icon: <User />,
    name: "Account",
    link: "/employee/account",
  },
];

export { title, primaryGroup, secondaryGroup, footerGroup };
