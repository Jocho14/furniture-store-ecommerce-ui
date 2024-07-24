import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Plus, Minus } from "iconoir-react";

import ActionIcon from "@/components/ActionIcon/ActionIcon";

import styles from "./styles.module.scss";

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onDecrement,
  onIncrement,
  onChange,
  className,
}) => {
  return (
    <div
      className={classNames(styles["quantity-stepper__container"], className)}
    >
      <button
        className={classNames(styles["quantity-stepper__container__button"], {
          [styles["disabled"]]: quantity <= 1,
        })}
        onClick={onDecrement}
        disabled={quantity <= 1}
      >
        <Minus
          className={classNames(styles["quantity-stepper__container__sign"], {
            [styles["disabled"]]: quantity <= 1,
          })}
        />
      </button>
      <input
        className={styles["quantity-stepper__container__input"]}
        type="number"
        value={quantity}
        onChange={onChange}
      />
      <button
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
