import React, { useRef } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import Grid from "@/components/Grid/Grid";
import Navbar from "@/components/Navbar/Navbar";
import CustomInput from "@/components/CustomInput/CustomInput";

import useMobile from "@/hooks/useMobile";
import useScroll from "@/hooks/useScroll";

import { useCart } from "@/context/client/CartContext";

import { Search } from "iconoir-react";

import styles from "./styles.module.scss";

const Header: React.FC = () => {
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
        <Navbar
          cartCount={cartCount}
          isMobile={isMobile}
          className={classNames(
            { "start-9 col-4": !isMobile },
            { "start-3 col-1": isMobile }
          )}
        />
      </Grid>
    </header>
  );
};

export default Header;
