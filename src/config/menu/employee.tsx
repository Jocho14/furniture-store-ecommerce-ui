import {
  Home,
  BookStack,
  Settings,
  BellNotification,
  LogOut,
  User,
  List,
  UserCart,
} from "iconoir-react";
import { MenuItem, ICollapsibleMenuItem } from "@/interfaces/MenuItem";

const title = "LOGO";

const managementItem: ICollapsibleMenuItem = {
  icon: <BookStack />,
  name: "Zarządzanie",
  link: "",
  subItems: [
    { icon: <List />, name: "Lista produktów", link: "/employee/product-list" },
    {
      icon: <UserCart />,
      name: "Dodaj produkt",
      link: "/employee/orders",
    },
  ],
};

const primaryGroup: MenuItem[] | ICollapsibleMenuItem[] = [
  { icon: <Home />, name: "Strona główna", link: "/employee/test" },
  // { icon: <BookStack />, name: "Zarządzanie", link: "/employee/product-list" },
  managementItem,
];

const secondaryGroup: MenuItem[] = [
  { icon: <Settings />, name: "Ustawienia", link: "/employee/settings" },
  {
    icon: <BellNotification />,
    name: "Powiadomienia",
    link: "/employee/notifications",
  },
];

const footerGroup: MenuItem[] = [
  { icon: <LogOut />, name: "Wyloguj", link: "/employee/logout" },
  {
    icon: <User />,
    name: "Konto",
    link: "/employee/account",
  },
];

export { title, primaryGroup, secondaryGroup, footerGroup };
