import React from "react";

import BaseNav from "../nav/BaseNav/BaseNav";
// import ManageNav from "../nav/ManageNav/ManageNav";

import Menu from "@/components/Menu/Menu";
import useMenu from "@/hooks/useMenu";
import UserRole from "@/enums/UserRole";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import SheetCloseWrapper from "@/components/SheetCloseWrapper/SheetCloseWrapper";
import { Toaster } from "@/components/ui/toaster";
import { Menu as MenuIcon } from "iconoir-react";
import styles from "./styles.module.scss";

interface Props {}

// enum NavState {
//   Base = "base",
//   Manage = "manage",
// }

const Header: React.FC<Props> = () => {
  //const [navState, setNavState] = useState<NavState>(NavState.Base);
  const menuData = useMenu(UserRole.Employee);

  return (
    <header className={styles["header"]}>
      <div className={styles["nav__container"]}>
        <BaseNav />
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
