import {
  Home,
  BookStack,
  Settings,
  BellNotification,
  LogOut,
  User,
} from "iconoir-react";
import { MenuItem } from "@/types/MenuItem";

const title = "LOGO";
const primaryGroup: MenuItem[] = [
  { icon: <Home />, name: "Strona główna", link: "/employee/test" },
  { icon: <BookStack />, name: "Zarządzanie", link: "/employee/product-list" },
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
