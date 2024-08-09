import React from "react";
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

export interface ShoppingCartProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrls: string;
  quantity: number;
  availability: boolean;
  detailsLoading: boolean;
  availabilityLoading: boolean;
  className?: string;
  onQuantityChange: (id: number, quantity: number) => void;
}

const ShoppingCartProduct: React.FC<ShoppingCartProductProps> = (props) => {
  const handleDecrement = () => {
    props.onQuantityChange(props.id, Math.max(0, props.quantity - 1));
  };

  const handleIncrement = () => {
    props.onQuantityChange(props.id, Math.min(999, props.quantity + 1));
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      props.onQuantityChange(props.id, Math.min(999, value));
    }
  };

  return (
    <div className={classNames(styles["product__container"])}>
      <div className={styles["product__container__image__wrapper"]}>
        <SkeletonWrapper
          className="w-[100%] h-[100%]"
          loading={props.detailsLoading}
        >
          <img
            className={styles["product__container__image"]}
            src={props.imageUrls}
            alt={props.name}
          />
        </SkeletonWrapper>
      </div>

      <div className={styles["product__container__details"]}>
        <SkeletonWrapper
          className="w-[60px] h-[27px]"
          loading={props.detailsLoading}
        >
          <h2 className={styles["product__container__details__title"]}>
            {props.name}
          </h2>
        </SkeletonWrapper>
        <SkeletonWrapper
          className="w-[130px] h-[21px]"
          loading={props.detailsLoading}
        >
          <h4 className={styles["product__container__details__description"]}>
            {props.description}
          </h4>
        </SkeletonWrapper>

        <SkeletonWrapper
          className="w-[100px] h-[17px]"
          loading={props.detailsLoading || props.availabilityLoading}
        >
          <h5 className={styles["product__container__details__availability"]}>
            {props.availability ? (
              <>
                <CheckCircleSolid
                  className={
                    styles["product__container__details__availability__icon--g"]
                  }
                />{" "}
                Dostępny
              </>
            ) : (
              <>
                <XmarkCircleSolid
                  className={
                    styles["product__container__details__availability__icon--r"]
                  }
                />{" "}
                Niedostępny
              </>
            )}
          </h5>
        </SkeletonWrapper>

        <div className={styles["product__container__actions"]}>
          <QuantityStepper
            quantity={props.quantity}
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
                toast(`${props.name} - został usunięty z koszyka`, {
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
        <SkeletonWrapper
          className="w-[50px] h-[24px]"
          loading={props.detailsLoading}
        >
          <h4>{props.price}zł</h4>
        </SkeletonWrapper>
      </div>
    </div>
  );
};

export default ShoppingCartProduct;
