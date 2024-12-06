import React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import { ArrowRight } from "iconoir-react";
import styles from "./styles.module.scss";

interface CheckoutButtonProps {
  className?: string;
  isDisabled?: boolean;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  className,
  isDisabled = false,
}) => {
  const navigate = useNavigate();
  return (
    <button
      aria-label="Continue to checkout"
      disabled={isDisabled}
      onClick={() => navigate("/order/delivery-details")}
      className={classNames(
        styles["checkout-btn"],
        styles[`${isDisabled ? "disabled" : ""}`],
        className
      )}
    >
      <span className={styles["checkout-btn__info"]}>Continue to checkout</span>{" "}
      <ArrowRight className={styles["checkout-btn__icon"]} />
    </button>
  );
};

export default CheckoutButton;
