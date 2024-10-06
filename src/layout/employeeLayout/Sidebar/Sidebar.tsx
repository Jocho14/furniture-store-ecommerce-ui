import React from "react";

import Menu from "@/components/Menu/Menu";
import {
  Home,
  BookStack,
  Settings,
  BellNotification,
  User,
  LogOut,
} from "iconoir-react";

import styles from "./styles.module.scss";

const title = "Menu";
const primaryGroup = [
  { icon: <Home />, name: "Strona główna", link: "/employee/test" },
  { icon: <BookStack />, name: "Zarządzanie", link: "/employee/product-list" },
];

const secondaryGroup = [
  { icon: <Settings />, name: "Ustawienia", link: "/employee/settings" },
  {
    icon: <BellNotification />,
    name: "Powiadomienia",
    link: "/employee/notifications",
  },
];

const footerGroup = [
  { icon: <LogOut />, name: "Wyloguj", link: "/employee/logout" },
  {
    icon: <User />,
    name: "Konto",
    link: "/employee/account",
  },
];

const Sidebar: React.FC = () => {
  return (
    <nav className={styles["sidebar"]}>
      <Menu
        title={title}
        primaryGroup={primaryGroup}
        secondaryGroup={secondaryGroup}
        footerGroup={footerGroup}
      />
    </nav>
  );
};

export default Sidebar;
