import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { ArrowRight } from "iconoir-react";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

interface CheckoutButtonProps {
  className?: string;
  isDisabled?: boolean;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ className, isDisabled = false }) => {
  const navigate = useNavigate();
  return (
    <button
      disabled={isDisabled}
      onClick={() => navigate("/order/delivery-details")}
      className={classNames(styles["checkout-btn"], styles[`${isDisabled ? "disabled" : ""}`], className)}
    >
      <span className={styles["checkout-btn__info"]}>Continue to checkout</span>{" "}
      <ArrowRight className={styles["checkout-btn__icon"]} />
    </button>
  );
};

export default CheckoutButton;
