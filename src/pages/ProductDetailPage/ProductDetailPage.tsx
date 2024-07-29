import React, { useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import Grid from "@/components/Grid/Grid";
import QuantityStepper from "@/components/QuantityStepper/QuantityStepper";
import ProductDetailImages from "@/components/ProductDetailImages/ProductDetailImages";
import useFetch from "@/hooks/useFetch";
import useMobile from "@/hooks/useMobile";

import { productDetailImagesData } from "../../data/data";

import styles from "./styles.module.scss";

interface Product {
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
}

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const isMobile = useMobile();
  //const {data: product, loading, error} = useFetch<Product>(`BACKEND_URL/products/${productId}`);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

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
    <div className={styles["product-detail-page__wrapper"]}>
      <Grid>
        <div
          className={classNames(
            styles["separator"],
            { "start-1 col-12": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        ></div>
        <ProductDetailImages
          className={classNames(
            styles["product-detail-page__images"],
            { "start-1 col-7": !isMobile },
            { "start-1 col-4": isMobile }
          )}
          imageUrls={productDetailImagesData}
        />
        <div
          className={classNames(
            styles["product-detail-page__details"],
            { "start-9 col-4": !isMobile },
            { "start-1 col-4": isMobile },
            "align-top"
          )}
        >
          <h3 className={styles["product-detail-page__details__name"]}>
            Lorem Ipsum
          </h3>
          <h4 className={styles["product-detail-page__details__description"]}>
            Krótki opis
          </h4>
          <h2 className={styles["product-detail-page__details__price"]}>
            200zł
          </h2>
          <div className={styles["product-detail-page__details__actions"]}>
            <QuantityStepper
              quantity={quantity}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              onChange={handleChange}
              className={
                styles["product-detail-page__details__actions__stepper"]
              }
            />
            <button
              className={
                styles["product-detail-page__details__actions__add-to-cart-btn"]
              }
            >
              <span
                className={
                  styles[
                    "product-detail-page__details__actions__add-to-cart-btn__info"
                  ]
                }
              >
                Dodaj do koszyka
              </span>
            </button>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default ProductDetailPage;
