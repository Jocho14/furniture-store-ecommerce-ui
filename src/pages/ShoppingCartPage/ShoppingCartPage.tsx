import React, { useEffect, useState } from "react";
import classNames from "classnames";

import Grid from "@/components/Grid/Grid";
import ShoppingCartProduct from "@/components/ShoppingCartProduct/ShoppingCartProduct";
import CheckoutButton from "@/components/CheckoutButton/CheckoutButton";

import useMobile from "@/hooks/useMobile";
import useFetch from "@/hooks/useFetch";

import { BACKEND_URL } from "@/config/config";

import styles from "./styles.module.scss";

interface ShoppingCartPageProps {}

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = () => {
  console.log(BACKEND_URL);
  const isMobile = useMobile();
  const { data, loading, error } = useFetch({
    url: `${BACKEND_URL}/products/1`,
  });

  return (
    <div className={styles["cart-page__container"]}>
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
          <ShoppingCartProduct {...data} loading={loading} />
          <ShoppingCartProduct {...data} loading={loading} />
          <ShoppingCartProduct {...data} loading={loading} />
          <ShoppingCartProduct {...data} loading={loading} />

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
