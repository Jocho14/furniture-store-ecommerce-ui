import React from "react";
import styles from "./styles.module.scss";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { MenuItem } from "@/types/MenuItem";

interface MenuProps {
  title: React.ReactNode;
  primaryGroup: MenuItem[];
  secondaryGroup: MenuItem[];
  footerGroup: MenuItem[];
  closeWrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

const Menu: React.FC<MenuProps> = ({
  title,
  primaryGroup,
  secondaryGroup,
  footerGroup,
  closeWrapper: Wrapper = (props) => <>{props.children}</>,
}) => {
  return (
    <nav className={styles["nav"]}>
      <ul className={styles["main-list"]}>
        <span className={styles["title"]}>{title} </span>
        {primaryGroup.map((item) => (
          <li key={item.name}>
            <Wrapper>
              <Link to={item.link} className={styles["li"]}>
                {item.icon}
                {item.name}
              </Link>
            </Wrapper>
          </li>
        ))}
        {secondaryGroup.length > 0 && (
          <>
            <div className={styles["separator__container"]}>
              <Separator />
            </div>
            {secondaryGroup.map((item) => (
              <li key={item.name}>
                <Link to={item.link} className={styles["li"]}>
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>
      <ul className={styles["footer-list"]}>
        <div className={styles["separator__container"]}>
          <Separator />
        </div>
        {footerGroup.map((item) => (
          <li key={item.name}>
            <Link to={item.link} className={styles["li"]}>
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
