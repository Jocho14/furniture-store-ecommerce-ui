import React, { useEffect, useState } from "react";
import classNames from "classnames";

import Grid from "@/components/Grid/Grid";
import ShoppingCartProduct from "@/components/ShoppingCartProduct/ShoppingCartProduct";
import CheckoutButton from "@/components/CheckoutButton/CheckoutButton";

import { shoppingCartProductData } from "../../data/data";
import styles from "./styles.module.scss";

interface ShoppingCartPageProps {}

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles["cart-page__container"]}>
      <Grid>
        <div
          className={classNames(
            styles["cart-page__container__items"],
            "align-top",
            { "start-1 col-7": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          <ShoppingCartProduct {...shoppingCartProductData} />
          <ShoppingCartProduct {...shoppingCartProductData} />
          <ShoppingCartProduct {...shoppingCartProductData} />
          <ShoppingCartProduct {...shoppingCartProductData} />
          <ShoppingCartProduct {...shoppingCartProductData} />
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
        {!isMobile && (
          <CheckoutButton
            className={classNames(
              "align-top",
              { "start-9 col-4": !isMobile },
              { "start-1 col-4": isMobile }
            )}
          />
        )}
      </Grid>
    </div>
  );
};

export default ShoppingCartPage;
