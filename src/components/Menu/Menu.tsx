import React from "react";
import styles from "./styles.module.scss";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface MenuProps {
  title: React.ReactNode;
  primaryGroup: MenuElement[];
  secondaryGroup: MenuElement[];
  footerGroup: MenuElement[];
}

interface MenuElement {
  icon: React.ReactNode;
  name: string;
  link: string;
}

const Menu: React.FC<MenuProps> = ({
  title,
  primaryGroup,
  secondaryGroup,
  footerGroup,
}) => {
  return (
    <nav className={styles["nav"]}>
      <ul className={styles["main-list"]}>
        <h1 className={styles["title"]}>{title}</h1>
        {primaryGroup.map((item) => (
          <Link key={item.name} to={item.link} className={styles["li"]}>
            {item.icon}
            {item.name}
          </Link>
        ))}
        <Separator />
        {secondaryGroup.map((item) => (
          <Link key={item.name} to={item.link} className={styles["li"]}>
            {item.icon}
            {item.name}
          </Link>
        ))}
      </ul>
      <ul className={styles["footer-list"]}>
        <Separator />
        {footerGroup.map((item) => (
          <Link key={item.name} to={item.link} className={styles["li"]}>
            {item.icon}
            {item.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
