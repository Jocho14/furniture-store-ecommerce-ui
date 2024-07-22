import React, { useState } from "react";
import classNames from "classnames";
import {
  CheckCircleSolid,
  XmarkCircleSolid,
  Heart,
  Trash,
} from "iconoir-react";

import QuantityStepper from "@/components/QuantityStepper/QuantityStepper";

import styles from "./styles.module.scss";

interface ShoppingCartProductProps {
  title: string;
  image: string;
  description: string;
  price: number;
  className?: string;
}

const ShoppingCartProduct: React.FC<ShoppingCartProductProps> = (props) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(999, prev + 1));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      value < 1000 ? setQuantity(value) : setQuantity(999);
    }
  };

  return (
    <div className={classNames(styles["product__container"])}>
      <div className={styles["product__container__image__wrapper"]}>
        <img
          className={styles["product__container__image"]}
          src={props.image}
          alt={props.title}
        />
      </div>

      <div className={styles["product__container__details"]}>
        <h2 className={styles["product__container__details__title"]}>
          {props.title}
        </h2>
        <h4 className={styles["product__container__details__description"]}>
          {props.description}
        </h4>
        <h5 className={styles["product__container__details__availability"]}>
          {/* TODO: here will be invoked a function checking the availability from the backend */}
          <CheckCircleSolid
            className={
              styles["product__container__details__availability__icon"]
            }
          />{" "}
          Dostępny
        </h5>
        <div className={styles["product__container__actions"]}>
          <QuantityStepper
            quantity={quantity}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            onChange={handleChange}
          />
          <div className={styles["product__container__actions__user-tools"]}>
            <Heart />
            <Trash />
          </div>
        </div>
      </div>

      <div className={styles["product__container__price"]}>
        <h4>{props.price}zł</h4>
      </div>
    </div>
  );
};

export default ShoppingCartProduct;
