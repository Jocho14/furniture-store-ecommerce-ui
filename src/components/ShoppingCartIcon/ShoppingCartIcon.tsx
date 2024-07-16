import React from "react";
import styles from "./styles.module.scss";
import { ShoppingBag } from "iconoir-react";
import classNames from "classnames";

interface ShoppingCartIconProps {
  count: number;
  className?: string;
}

export const ShoppingCartIcon: React.FC<ShoppingCartIconProps> = ({
  count,
  className,
}) => {
  return (
    <div className={classNames(styles["cart-icon__container"], className)}>
      {count > 0 ? (
        <span className={styles["cart-icon__container__badge"]}>
          {count <= 99 ? count : "99+"}
        </span>
      ) : null}
      <ShoppingBag />
    </div>
  );
};
