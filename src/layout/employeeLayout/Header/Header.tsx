import React from "react";

import BaseNav from "../nav/product/BaseNav/BaseNav";
import EditNav from "../nav/product/EditNav/EditNav";
import AddNav from "../nav/product/AddNav/AddNav";
// import ManageNav from "../nav/ManageNav/ManageNav";
import OrderBaseNav from "../nav/order/BaseNav/BaseNav";
import ManageNav from "../nav/order/ManageNav/ManageNav";
import ManageCanceledNav from "../nav/order/ManageCanceledNav/ManageCanceledNav";

import { useHeader } from "@/context/employee/HeaderContext";

import Menu from "@/components/Menu/Menu";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import SheetCloseWrapper from "@/components/SheetCloseWrapper/SheetCloseWrapper";

import useMenu from "@/hooks/useMenu";

import UserRole from "@/enums/UserRole";

import { Menu as MenuIcon } from "iconoir-react";
import styles from "./styles.module.scss";

interface Props {}

const Header: React.FC<Props> = () => {
  const { mode } = useHeader();
  const menuData = useMenu(UserRole.Employee);

  return (
    <header className={styles["header"]}>
      <div className={styles["nav__container"]}>
        {(() => {
          switch (mode) {
            case "list":
              return <BaseNav />;
            case "edit":
              return <EditNav />;
            case "add":
              return <AddNav />;
            case "order-list":
              return <OrderBaseNav />;
            case "order-edit":
              return <ManageNav />;
            case "order-cancel-edit":
              return <ManageCanceledNav />;
            default:
              return <BaseNav />;
          }
        })()}
      </div>
      <div className={styles["dropdown-menu__container"]}>
        <DropdownMenu
          trigger={<MenuIcon />}
          menu={<Menu {...menuData} closeWrapper={SheetCloseWrapper} />}
        />
      </div>
    </header>
  );
};

export default Header;
