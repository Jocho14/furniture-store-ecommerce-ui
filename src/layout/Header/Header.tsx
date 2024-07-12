import React, { useEffect, useState } from "react";
import classNames from "classnames";

import Grid from "@/components/Grid/Grid";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import { Input } from "@/components/ui/input";
import { Shop, User, Heart, ShoppingBag, Menu, Search } from "iconoir-react";

import styles from "./styles.module.scss";

interface Props {}

const Header: React.FC<Props> = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if the user is at the top of the page
      if (currentScrollY <= 10) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsHidden(true);
      } else {
        // Scrolling up
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
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
          className={classNames(
            styles["header__input"],
            { "start-2 col-6": !isMobile },
            { "grid-hidden": isMobile }
          )}
        >
          <Input className="hide" type="text" placeholder="Wyszukaj..." />
        </div>
        <ul
          className={classNames(
            styles["header__user-tools"],
            { "start-10 col-3": !isMobile },
            { "start-3 col-2": isMobile }
          )}
        >
          <li className={classNames(styles["header__user-tools__item"])}>
            <Search className={styles["header__user-tools__icon"]} />
          </li>
          <li className={classNames(styles["header__user-tools__item"])}>
            <Shop className={styles["header__user-tools__icon"]} />
          </li>
          <li className={styles["header__user-tools__item"]}>
            <User className={styles["header__user-tools__icon"]} />
          </li>
          <li className={styles["header__user-tools__item"]}>
            <Heart className={classNames(styles["header__user-tools__icon"])} />
          </li>
          <li className={styles["header__user-tools__item"]}>
            <ShoppingBag className={styles["header__user-tools__icon"]} />
          </li>
          <li className={styles["header__user-tools__item"]}>
            <DropdownMenu
              trigger={
                <div>
                  <Menu className={styles["header__user-tools__icon"]} />
                  <span className="sr-only">Open menu</span>
                </div>
              }
            />
          </li>
        </ul>
      </Grid>
    </header>
  );
};

export default Header;
