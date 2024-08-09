import React, { useRef } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import Grid from "@/components/Grid/Grid";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import FavouritesDrawer from "@/components/FavouritesDrawer/FavouritesDrawer";
import CustomInput from "@/components/CustomInput/CustomInput";
import ActionIcon from "@/components/ActionIcon/ActionIcon";
import useMobile from "@/hooks/useMobile";
import useScroll from "@/hooks/useScroll";
import { useCart } from "@/context/CartContext";
import { Shop, User, Heart, Menu, Search } from "iconoir-react";
import { ShoppingCartIcon } from "@/components/ShoppingCartIcon/ShoppingCartIcon";

import styles from "./styles.module.scss";

interface Props {}

const Header: React.FC<Props> = () => {
  const isMobile = useMobile();
  const { cartCount } = useCart();
  const headerRef = useRef<HTMLDivElement>(null);
  useScroll(headerRef, styles);

  return (
    <header ref={headerRef} className={classNames(styles["header"])}>
      <Grid className={styles["grid"]}>
        <div className={classNames(styles["header__logo"], "start-1", "col-1")}>
          <Link to="">LOGO</Link>
        </div>
        <div
          className={classNames(
            styles["header__input"],
            { "start-2 col-6": !isMobile },
            { "grid-hidden": isMobile }
          )}
        >
          <CustomInput type="text" icon={<Search />} placeholder="Wyszukaj" />
        </div>
        <ul
          className={classNames(
            styles["header__user-tools"],
            { "start-10 col-3": !isMobile },
            { "start-3 col-1": isMobile }
          )}
        >
          {!!isMobile && (
            <li className={styles["header__user-tools__item"]}>
              <ActionIcon icon={<Search />} />
            </li>
          )}

          {!isMobile && (
            <li className={styles["header__user-tools__item"]}>
              <ActionIcon icon={<Shop />} linkTo="/product/1" />
            </li>
          )}

          <li className={styles["header__user-tools__item"]}>
            <ActionIcon icon={<User />} linkTo="/auth" />
          </li>

          {!isMobile && (
            <li className={styles["header__user-tools__item"]}>
              <FavouritesDrawer trigger={<ActionIcon icon={<Heart />} />} />
            </li>
          )}

          <li
            className={classNames(
              styles["header__user-tools__item"],
              styles["header__user-tools__item__cart-icon"]
            )}
          >
            <ActionIcon
              icon={<ShoppingCartIcon count={cartCount} />}
              linkTo={"/shopping-cart"}
            />
          </li>

          {!!isMobile && (
            <li className={styles["header__user-tools__item"]}>
              <DropdownMenu trigger={<ActionIcon icon={<Menu />} />} />
            </li>
          )}
        </ul>
      </Grid>
    </header>
  );
};

export default Header;
