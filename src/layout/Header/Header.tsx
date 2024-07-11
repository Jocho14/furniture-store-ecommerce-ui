import React, { useEffect, useState } from "react";
import classNames from "classnames";

import Grid from "@/components/Grid/Grid";
import { Input } from "@/components/ui/input";
import { Shop, User, Heart, ShoppingBag } from "iconoir-react";

import styles from "./styles.module.scss";

interface Props {}

const Header: React.FC<Props> = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setIsHidden(true);
      } else {
        // Scrolling up
        setIsHidden(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={classNames(styles.header, {
        [styles["header--hidden"]]: isHidden,
      })}
    >
      <Grid className={styles["grid"]}>
        <div className={classNames(styles["header__logo"], "start-1", "col-1")}>
          LOGO
        </div>
        <div
          className={classNames(styles["header__input"], "start-2", "col-6")}
        >
          <Input type="text" placeholder="Search for products" />
        </div>
        <ul
          className={classNames(
            styles["header__user-tools"],
            "start-9",
            "col-4"
          )}
        >
          <li className={styles["header__user-tools__item"]}>
            <Shop className={styles["header__user-tools__icon"]} />
          </li>
          <li className={styles["header__user-tools__item"]}>
            <User className={styles["header__user-tools__icon"]} />
          </li>
          <li className={styles["header__user-tools__item"]}>
            <Heart className={styles["header__user-tools__icon"]} />
          </li>
          <li className={styles["header__user-tools__item"]}>
            <ShoppingBag className={styles["header__user-tools__icon"]} />
          </li>
        </ul>
      </Grid>
    </header>
  );
};

export default Header;
