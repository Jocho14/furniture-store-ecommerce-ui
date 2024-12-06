import React from "react";
import { Link } from "react-router-dom";

import { Separator } from "@/components/ui/separator";

import { MenuItem, ICollapsibleMenuItem } from "@/interfaces/MenuItem";

import CollapsibleMenuItem from "../CollapsibleMenuItem/CollapsibleMenuItem";
import Logo from "@/assets/images/logo.svg";
import styles from "./styles.module.scss";

interface MenuProps {
  title: React.ReactNode;
  primaryGroup: MenuItem[] | ICollapsibleMenuItem[];
  secondaryGroup: MenuItem[];
  footerGroup: MenuItem[];
  closeWrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

function isCollapsibleMenuItem(
  item: MenuItem | ICollapsibleMenuItem
): item is ICollapsibleMenuItem {
  return (item as ICollapsibleMenuItem).subItems !== undefined;
}

const Menu: React.FC<MenuProps> = ({
  primaryGroup,
  secondaryGroup,
  footerGroup,
  closeWrapper: Wrapper = (props) => <>{props.children}</>,
}) => {
  return (
    <nav className={styles["nav"]}>
      <ul className={styles["main-list"]}>
        <span className={styles["title"]}><img src={Logo} width={70} height={70} alt="logo"/></span>
        {primaryGroup.map((item) =>
          isCollapsibleMenuItem(item) ? (
            <CollapsibleMenuItem
              key={item.name}
              name={item.name}
              link=""
              icon={item.icon}
              subItems={item.subItems}
              closeWrapper={Wrapper}
            />
          ) : (
            <li key={item.name}>
              <Wrapper>
                <Link to={item.link} className={styles["li"]}>
                  {item.icon}
                  {item.name}
                </Link>
              </Wrapper>
            </li>
          )
        )}

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
