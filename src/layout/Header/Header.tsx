import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import Grid from "@/components/Grid/Grid";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import FavouritesDrawer from "@/components/FavouritesDrawer/FavouritesDrawer";
import CustomInput from "@/components/CustomInput/CustomInput";
import { Shop, User, Heart, Menu, Search } from "iconoir-react";
import { ShoppingCartIcon } from "@/components/ShoppingCartIcon/ShoppingCartIcon";

import styles from "./styles.module.scss";

interface Props {}

const Header: React.FC<Props> = () => {
  const isHidden = useRef(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);
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
        isHidden.current = false;
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        isHidden.current = true;
      } else {
        // Scrolling up
        isHidden.current = false;
      }

      lastScrollY.current = currentScrollY;

      if (headerRef.current) {
        if (isHidden.current) {
          headerRef.current.classList.add(styles["header--hidden"]);
        } else {
          headerRef.current.classList.remove(styles["header--hidden"]);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            { "start-3 col-3": isMobile }
          )}
        >
          {!!isMobile && (
            <li className={styles["header__user-tools__item"]}>
              <Search className={styles["header__user-tools__icon"]} />
            </li>
          )}

          {!isMobile && (
            <li className={styles["header__user-tools__item"]}>
              <Shop className={styles["header__user-tools__icon"]} />
            </li>
          )}

          <li className={styles["header__user-tools__item"]}>
            <User className={styles["header__user-tools__icon"]} />
          </li>

          {!isMobile && (
            <li className={styles["header__user-tools__item"]}>
              <FavouritesDrawer
                trigger={
                  <div>
                    <Heart className={styles["header__user-tools__icon"]} />
                    <span className="sr-only">Open menu</span>
                  </div>
                }
              />
            </li>
          )}

          <li className={styles["header__user-tools__item"]}>
            <Link to="/shopping-cart">
              <ShoppingCartIcon
                count={130}
                className={styles["header__user-tools__icon"]}
              />
            </Link>
          </li>

          {!!isMobile && (
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
          )}
        </ul>
      </Grid>
    </header>
  );
};

export default Header;
