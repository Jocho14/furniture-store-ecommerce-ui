import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { ArrowRight } from "iconoir-react";

import styles from "./styles.module.scss";

interface CheckoutButtonProps {
  className?: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ className }) => {
  return (
    <Link
      to="/order/checkout"
      className={classNames(styles["checkout-btn"], className)}
    >
      <span className={styles["checkout-btn__info"]}>Continue to checkout</span>{" "}
      <ArrowRight className={styles["checkout-btn__icon"]} />
    </Link>
  );
};

export default CheckoutButton;
