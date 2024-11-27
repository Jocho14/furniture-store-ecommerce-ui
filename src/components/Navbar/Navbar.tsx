import React from "react";
import classNames from "classnames";

import Menu from "@/components/Menu/Menu";
import ActionIcon from "@/components/ActionIcon/ActionIcon";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import FavouritesDrawer from "@/components/FavouritesDrawer/FavouritesDrawer";
import SheetCloseWrapper from "@/components/SheetCloseWrapper/SheetCloseWrapper";
import { ShoppingCartIcon } from "@/components/ShoppingCartIcon/ShoppingCartIcon";

import useMenu from "@/hooks/useMenu";

import UserRole from "@/enums/UserRole";

import { useAuth } from "@/context/common/AuthContext";

import {
  Shop,
  User,
  ProfileCircle,
  Heart,
  Menu as MenuIcon,
  Search,
} from "iconoir-react";
import styles from "./styles.module.scss";

interface NavbarProps {
  cartCount: number;
  isMobile: boolean;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, isMobile, className }) => {
  const menuData = useMenu(UserRole.Client);
  const account = useAuth();

  const userTools = [
    { icon: <Search />, isMobile: true },
    account?.account?.accountId
      ? {
          icon: <ProfileCircle />,
          label: `Hi, ${account?.account.firstName}`,
          labelVisibility: "desktop-only",
          linkTo: "/profile",
        }
      : {
          icon: <User />,
          label: "Login",
          labelVisibility: "desktop-only",
          linkTo: "/auth",
        },
    {
      icon: <Heart />,
      label: "Favourites",
      labelVisibility: "desktop-only",
      uiComponent: <FavouritesDrawer />,
      isMobile: false,
    },
    { icon: <ShoppingCartIcon count={cartCount} />, linkTo: "/shopping-cart", label: "Shopping Cart", labelVisibility: "desktop-only" },

    {
      icon: <MenuIcon />,
      uiComponent: (
        <DropdownMenu
          trigger={<MenuIcon />}
          menu={<Menu {...menuData} closeWrapper={SheetCloseWrapper} />}
        />
      ),
      isMobile: true,
    },
  ];

  return (
    <ul className={classNames(styles["navbar"], className)}>
      {userTools.map((tool, index) => {
        if (tool.isMobile !== undefined && tool.isMobile !== isMobile) {
          return null;
        }

        return (
          <li key={index} className={styles["navbar__item"]}>
            {tool.uiComponent ? (
              React.cloneElement(tool.uiComponent, {
                trigger: (
                  <ActionIcon
                    icon={tool.icon}
                    label={tool.label}
                    labelVisibility={tool.labelVisibility}
                  />
                ),
              })
            ) : (
              <ActionIcon
                icon={tool.icon}
                label={tool.label}
                labelVisibility={tool.labelVisibility}
                linkTo={tool.linkTo}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Navbar;
