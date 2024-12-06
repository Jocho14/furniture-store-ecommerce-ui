import React from "react";
import classNames from "classnames";

import { Plus, Minus } from "iconoir-react";

import styles from "./styles.module.scss";

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onDecrement,
  onIncrement,
  onChange,
  onFocus,
  className,
}) => {
  return (
    <div
      className={classNames(styles["quantity-stepper__container"], className)}
    >
      <button
        aria-label="Decrement quantity"
        className={classNames(styles["quantity-stepper__container__button"], {
          [styles["disabled"]]: quantity <= 0,
        })}
        onClick={onDecrement}
        disabled={quantity <= 0}
      >
        <Minus
          className={classNames(styles["quantity-stepper__container__sign"], {
            [styles["disabled"]]: quantity <= 0,
          })}
        />
      </button>
      <input
        className={styles["quantity-stepper__container__input"]}
        type="number"
        value={quantity}
        onChange={onChange}
        onFocus={onFocus}
      />
      <button
        aria-label="Increment quantity"
        className={classNames(styles["quantity-stepper__container__button"], {
          [styles["disabled"]]: quantity >= 999,
        })}
        onClick={onIncrement}
        disabled={quantity >= 999}
      >
        <Plus
          className={classNames(styles["quantity-stepper__container__sign"], {
            [styles["disabled"]]: quantity >= 999,
          })}
        />
      </button>
    </div>
  );
};

export default QuantityStepper;
