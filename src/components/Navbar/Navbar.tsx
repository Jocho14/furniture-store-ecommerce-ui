import React from "react";
import classNames from "classnames";

import ActionIcon from "@/components/ActionIcon/ActionIcon";
import { ShoppingCartIcon } from "@/components/ShoppingCartIcon/ShoppingCartIcon";
import FavouritesDrawer from "@/components/FavouritesDrawer/FavouritesDrawer";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";

import { Shop, User, Heart, Menu, Search } from "iconoir-react";

import styles from "./styles.module.scss";

interface NavbarProps {
  cartCount: number;
  isMobile: boolean;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, isMobile, className }) => {
  const userTools = [
    { icon: <Search />, isMobile: true },
    { icon: <Shop />, linkTo: "/product/1", isMobile: false },
    {
      icon: <User />,
      label: "Zaloguj się",
      labelVisibility: "desktop-only",
      linkTo: "/auth",
    },
    {
      icon: <Heart />,
      label: "Ulubione",
      labelVisibility: "desktop-only",
      uiComponent: <FavouritesDrawer />,
      isMobile: false,
    },
    { icon: <ShoppingCartIcon count={cartCount} />, linkTo: "/shopping-cart" },
    { icon: <Menu />, uiComponent: <DropdownMenu />, isMobile: true },
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
