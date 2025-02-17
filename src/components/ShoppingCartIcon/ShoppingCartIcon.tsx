import React from "react";
import classNames from "classnames";

import { ShoppingBag } from "iconoir-react";
import styles from "./styles.module.scss";

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
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
      <ShoppingBag />
    </div>
  );
};
