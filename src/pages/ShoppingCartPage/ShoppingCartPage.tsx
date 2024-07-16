import React, { useEffect, useState } from "react";
import classNames from "classnames";

import Grid from "@/components/Grid/Grid";
import ShoppingCartProduct from "@/components/ShoppingCartProduct/ShoppingCartProduct";
import { ArrowRightCircle } from "iconoir-react";

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
            <div
              className={classNames(
                styles["cart-page__container__checkout"],
                "align-top",
                { "start-9 col-4": !isMobile },
                { "start-1 col-4": isMobile }
              )}
            >
              <span>Przejdź do płatności</span> <ArrowRightCircle />
            </div>
          )}
        </div>
        {!isMobile && (
          <div
            className={classNames(
              styles["cart-page__container__checkout"],
              "align-top",
              { "start-9 col-4": !isMobile },
              { "start-1 col-4": isMobile }
            )}
          >
            <span>Przejdź do płatności</span> <ArrowRightCircle />
          </div>
        )}
      </Grid>
    </div>
  );
};

export default ShoppingCartPage;
