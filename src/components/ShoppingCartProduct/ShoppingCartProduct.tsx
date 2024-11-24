import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { toast } from "sonner";

import {
  addToFavorites,
  removeFromFavorites,
  checkFavourite,
} from "@/api/client/products";

import {
  CheckCircleSolid,
  XmarkCircleSolid,
  Heart,
  Trash,
  HeartSolid,
} from "iconoir-react";

import SkeletonWrapper from "@/components/SkeletonWrapper/SkeletonWrapper";
import QuantityStepper from "@/components/QuantityStepper/QuantityStepper";
import ActionIcon from "@/components/ActionIcon/ActionIcon";

import { ShoppingCartProductProps } from "@/interfaces/Product";

import styles from "./styles.module.scss";

const ShoppingCartProduct: React.FC<ShoppingCartProductProps> = (props) => {
  const [isFavourite, setIsFavourite] = React.useState(false);
  const queryClient = useQueryClient();

  const handleDecrement = () => {
    props.onQuantityChange(props.productId, Math.max(0, props.quantity - 1));
  };

  const handleIncrement = () => {
    props.onQuantityChange(props.productId, Math.min(999, props.quantity + 1));
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      props.onQuantityChange(props.productId, Math.min(999, value));
    }
  };

  const { data: isFavouriteData } = useQuery({
    queryKey: ["isFavourite", props.productId],
    queryFn: () => checkFavourite(props.productId),
  });

  useEffect(() => {
    if (isFavouriteData) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [isFavouriteData]);

  const addMutation = useMutation({
    mutationFn: () => addToFavorites(props.productId),
    onSuccess: () => {
      setIsFavourite(true);
      queryClient.invalidateQueries({ queryKey: ["favouriteProducts"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => removeFromFavorites(props.productId),
    onSuccess: () => {
      setIsFavourite(false);
      queryClient.invalidateQueries({ queryKey: ["favouriteProducts"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  return (
    <div className={classNames(styles["product__container"])}>
      <div className={styles["product__container__image__wrapper"]}>
        <SkeletonWrapper
          className="w-[100%] h-[100%]"
          loading={props.detailsLoading}
        >
          <Link to={`/product/${props.productId}`}>
            <img
              className={styles["product__container__image"]}
              src={props.thumbnailUrl}
              alt={props.name}
            />
          </Link>
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
          className="w-[100px] h-[27px]"
          loading={props.detailsLoading || props.availabilityLoading}
        >
          <div className={styles["product__container__details__availability"]}>
            {props.availability ? (
              <div
                className={
                  styles[
                    "product__container__details__availability__container--g"
                  ]
                }
              >
                <CheckCircleSolid
                  className={
                    styles["product__container__details__availability__icon--g"]
                  }
                />
                <span
                  className={
                    styles["product__container__details__availability__span"]
                  }
                >
                  Available
                </span>
              </div>
            ) : (
              <div
                className={
                  styles[
                    "product__container__details__availability__container--r"
                  ]
                }
              >
                <XmarkCircleSolid
                  className={
                    styles["product__container__details__availability__icon--r"]
                  }
                />
                <span
                  className={
                    styles["product__container__details__availability__span"]
                  }
                >
                  Unavailable
                </span>
              </div>
            )}
          </div>
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
                isFavourite ? (
                  <HeartSolid
                    className={
                      styles["product__container__actions__user-tools__icon"]
                    }
                  />
                ) : (
                  <Heart
                    className={
                      styles["product__container__actions__user-tools__icon"]
                    }
                  />
                )
              }
              size="small"
              onClick={() => {
                isFavourite ? removeMutation.mutate() : addMutation.mutate();
              }}
            />

            <ActionIcon
              icon={
                <Trash
                  className={
                    styles["product__container__actions__user-tools__icon"]
                  }
                />
              }
              onClick={() => {
                props.onQuantityChange(props.productId, 0);
                toast(`${props.name} - has been remove from the cart`, {
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                });
              }}
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
