import React from "react";

import Menu from "@/components/Menu/Menu";
import useMenu from "@/hooks/useMenu";
import UserRole from "@/enums/UserRole";

import styles from "./styles.module.scss";

const Sidebar: React.FC = () => {
  const menu = useMenu(UserRole.Employee);

  return (
    <nav className={styles["sidebar"]}>
      <Menu {...menu} />
    </nav>
  );
};

export default Sidebar;
