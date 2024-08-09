import React from "react";
import classNames from "classnames";

import Grid from "@/components/Grid/Grid";
import ShoppingCartProduct from "@/components/ShoppingCartProduct/ShoppingCartProduct";
import CheckoutButton from "@/components/CheckoutButton/CheckoutButton";
import CartActionToast from "@/components/CartActionToast/CartActionToast";
import { ShoppingCartProductProps } from "@/components/ShoppingCartProduct/ShoppingCartProduct";

import { Quantities, Availability } from "./ShoppingCartPageContainer";

import styles from "./styles.module.scss";

interface ShoppingCartPageProps {
  isMobile: boolean;
  productsData: ShoppingCartProductProps[];
  quantities: Quantities;
  availability: Availability;
  productsLoading: boolean;
  quantitiesLoading: boolean;
  onQuantityChange: (id: number, quantity: number) => void;
}

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = ({
  isMobile,
  productsData,
  quantities,
  availability,
  productsLoading,
  quantitiesLoading,
  onQuantityChange,
}) => {
  return (
    <div className={styles["cart-page__container"]}>
      <CartActionToast />
      <Grid>
        <h1 className={styles["cart-page__container__info"]}>Koszyk</h1>
        <div
          className={classNames(
            styles["cart-page__container__items"],
            "align-top",
            { "start-1 col-7": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          {productsData ? (
            productsData.map((product) => (
              <ShoppingCartProduct
                key={product.id}
                {...product}
                imageUrls={product.imageUrls[0]}
                quantity={quantities[product.id] ?? 1}
                availability={availability[product.id]}
                detailsLoading={productsLoading}
                availabilityLoading={quantitiesLoading}
                onQuantityChange={onQuantityChange}
              />
            ))
          ) : (
            <h4>Brak produktów w koszyku</h4>
          )}

          {isMobile && (
            <div
              className={classNames(
                "align-top",
                { "start-9 col-4": !isMobile },
                { "start-1 col-4": isMobile },
                styles["cart-page__container__summary__header"]
              )}
            >
              Podsumowanie
            </div>
          )}
          {isMobile && (
            <div className={styles["cart-page__container__summary__total"]}>
              <span>Wartość koszyka</span>
              <span
                className={styles["cart-page__container__summary__total__sum"]}
              >
                20zł
              </span>
            </div>
          )}
          {isMobile && (
            <CheckoutButton
              className={classNames(
                "align-top",
                { "start-9 col-4": !isMobile },
                { "start-1 col-4": isMobile }
              )}
            />
          )}
        </div>

        <div
          className={classNames(
            "align-top",
            { "start-9 col-4": !isMobile },
            { "start-1 col-4": isMobile },
            styles["cart-page__container__summary"]
          )}
        >
          {!isMobile && (
            <h4 className={styles["cart-page__container__summary__header"]}>
              Podsumowanie
            </h4>
          )}
          {!isMobile && (
            <div className={styles["cart-page__container__summary__total"]}>
              <span>Wartość koszyka</span>
              <span
                className={styles["cart-page__container__summary__total__sum"]}
              >
                20zł
              </span>
            </div>
          )}
          {!isMobile && <CheckoutButton />}
        </div>
      </Grid>
    </div>
  );
};

export default ShoppingCartPage;
