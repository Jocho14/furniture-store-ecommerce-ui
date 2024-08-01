import React, { useState } from "react";
import classNames from "classnames";
import {
  CheckCircleSolid,
  XmarkCircleSolid,
  Heart,
  Trash,
} from "iconoir-react";
import { toast } from "sonner";

import SkeletonWrapper from "@/components/SkeletonWrapper/SkeletonWrapper";
import QuantityStepper from "@/components/QuantityStepper/QuantityStepper";
import ActionIcon from "@/components/ActionIcon/ActionIcon";

import styles from "./styles.module.scss";
import { Skeleton } from "../ui/skeleton";

interface ShoppingCartProductProps {
  title: string;
  image: string;
  description: string;
  price: number;
  loading: boolean;
  className?: string;
}

const ShoppingCartProduct: React.FC<ShoppingCartProductProps> = (props) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(999, prev + 1));
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
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
        <SkeletonWrapper className="w-[100%] h-[100%]" loading={props.loading}>
          <img
            className={styles["product__container__image"]}
            src={props.image}
            alt={props.title}
          />
        </SkeletonWrapper>
      </div>

      <div className={styles["product__container__details"]}>
        <SkeletonWrapper className="w-[60px] h-[27px]" loading={props.loading}>
          <h2 className={styles["product__container__details__title"]}>
            {props.title}
          </h2>
        </SkeletonWrapper>
        <SkeletonWrapper className="w-[130px] h-[21px]" loading={props.loading}>
          <h4 className={styles["product__container__details__description"]}>
            {props.description}
          </h4>
        </SkeletonWrapper>

        <SkeletonWrapper className="w-[100px] h-[17px]" loading={props.loading}>
          <h5 className={styles["product__container__details__availability"]}>
            <CheckCircleSolid
              className={
                styles["product__container__details__availability__icon"]
              }
            />{" "}
            Dostępny
          </h5>
        </SkeletonWrapper>

        <div className={styles["product__container__actions"]}>
          <QuantityStepper
            quantity={quantity}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <div className={styles["product__container__actions__user-tools"]}>
            <ActionIcon
              icon={
                <Heart
                  className={
                    styles["product__container__actions__user-tools__icon"]
                  }
                />
              }
              size="small"
            />

            <ActionIcon
              icon={
                <Trash
                  className={
                    styles["product__container__actions__user-tools__icon"]
                  }
                />
              }
              onClick={() =>
                toast(`${props.title} - został usunięty z koszyka`, {
                  action: {
                    label: "Cofnij",
                    onClick: () => console.log("Cofnięto"),
                  },
                })
              }
              size="small"
            />
          </div>
        </div>
      </div>

      <div className={styles["product__container__price"]}>
        <SkeletonWrapper className="w-[50px] h-[24px]" loading={props.loading}>
          <h4>{props.price}zł</h4>
        </SkeletonWrapper>
      </div>
    </div>
  );
};

export default ShoppingCartProduct;
