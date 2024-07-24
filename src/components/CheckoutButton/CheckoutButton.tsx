import React from "react";
import classNames from "classnames";

import { ArrowRight } from "iconoir-react";

import styles from "./styles.module.scss";

interface CheckoutButtonProps {
  className?: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ className }) => {
  return (
    <button className={classNames(styles["checkout-btn"], className)}>
      <span className={styles["checkout-btn__info"]}>Przejdź do płatności</span>{" "}
      <ArrowRight className={styles["checkout-btn__icon"]} />
    </button>
  );
};

export default CheckoutButton;
