import React from "react";

import BaseNav from "../nav/product/BaseNav/BaseNav";
import EditNav from "../nav/product/EditNav/EditNav";
import AddNav from "../nav/product/AddNav/AddNav";
// import ManageNav from "../nav/ManageNav/ManageNav";

import OrderBaseNav from "../nav/order/BaseNav/BaseNav";

import Menu from "@/components/Menu/Menu";
import useMenu from "@/hooks/useMenu";
import UserRole from "@/enums/UserRole";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import SheetCloseWrapper from "@/components/SheetCloseWrapper/SheetCloseWrapper";
import { Menu as MenuIcon } from "iconoir-react";
import styles from "./styles.module.scss";
import { useHeader } from "@/context/employee/HeaderContext";

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
