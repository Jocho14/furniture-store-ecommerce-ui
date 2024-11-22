import React from "react";
import classNames from "classnames";

import Grid from "@/components/Grid/Grid";
import ShoppingCartProduct from "@/components/ShoppingCartProduct/ShoppingCartProduct";
import CheckoutButton from "@/components/CheckoutButton/CheckoutButton";
import CartActionToast from "@/components/CartActionToast/CartActionToast";
import { ShoppingCartProductProps } from "@/interfaces/Product";

import { Quantities, Availability } from "./ShoppingCartPageContainer";
import { Button } from "@/components/ui/button";

import styles from "./styles.module.scss";

import { Link } from "react-router-dom";

interface ShoppingCartPageProps {
  isMobile: boolean;
  productsData: ShoppingCartProductProps[];
  quantities: Quantities;
  availability: Availability;
  cartPrice: number;
  productsLoading: boolean;
  quantitiesLoading: boolean;
  onQuantityChange: (id: number, quantity: number) => void;
}

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = ({
  isMobile,
  productsData,
  quantities,
  availability,
  cartPrice,
  productsLoading,
  quantitiesLoading,
  onQuantityChange,
}) => {
  console.log("products DATA: ", productsData)
  return (
    <div className={styles["cart-page__container"]}>
      <CartActionToast />
      <Grid>
        <h1
          className={classNames(
            styles["cart-page__container__info"],
            "align-top",
            { "start-1 col-7": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          Shopping Cart
        </h1>
        <div
          className={classNames(
            styles["cart-page__container__items"],
            "align-top",
            { "start-1 col-7": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          {productsData.length > 0 ? (
            productsData.map((product) => (
              <ShoppingCartProduct
                key={product.productId}
                {...product}
                thumbnailUrl={product.thumbnailUrl}
                quantity={quantities[product.productId] ?? 1}
                availability={availability[product.productId]}
                detailsLoading={productsLoading}
                availabilityLoading={quantitiesLoading}
                onQuantityChange={onQuantityChange}
              />
            ))
          ) : (
            <div className="flex flex-col gap-6 items-start">
              <div className="flex flex-col gap-6 items-center">
                <h2>No products in the cart</h2>
                <Link to="/">
                  <Button>Shop now</Button>
                </Link>
              </div>
            </div>
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
              Summary
            </div>
          )}
          {isMobile && (
            <div className={styles["cart-page__container__summary__total"]}>
              <span>Products</span>
              <span
                className={styles["cart-page__container__summary__total__sum"]}
              >
                {cartPrice}zł
              </span>
            </div>
          )}
          {isMobile && (
            <CheckoutButton isDisabled={productsData.length === 0}
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
              Summary
            </h4>
          )}
          {!isMobile && (
            <div className={styles["cart-page__container__summary__total"]}>
              <span>Products</span>
              <span
                className={styles["cart-page__container__summary__total__sum"]}
              >
                {cartPrice === 0 ? "-" : `${cartPrice}zł`}
              </span>
            </div>
          )}
          {!isMobile && <CheckoutButton isDisabled={productsData.length === 0} />}
        </div>
      </Grid>
    </div>
  );
};

export default ShoppingCartPage;
