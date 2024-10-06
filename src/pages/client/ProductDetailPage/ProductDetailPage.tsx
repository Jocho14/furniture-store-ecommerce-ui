import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import classNames from "classnames";
import { toast } from "sonner";

import Grid from "@/components/Grid/Grid";
import QuantityStepper from "@/components/QuantityStepper/QuantityStepper";
import CartActionToast from "@/components/CartActionToast/CartActionToast";
import ProductDetailImages from "@/components/ProductDetailImages/ProductDetailImages";

import useFetch from "@/hooks/useFetch";
import useMobile from "@/hooks/useMobile";

import { useCart } from "@/context/CartContext";

import { BACKEND_URL } from "@/config/config";

import styles from "./styles.module.scss";

interface Product {
  name: string;
  price: number;
  description: string;
  imageUrls: string[];
}

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const productIdNumber = Number(productId);

  const navigate = useNavigate();
  const isMobile = useMobile();

  const {
    data: product,
    loading,
    error,
  } = useFetch<Product | null>({ url: `${BACKEND_URL}/products/${productId}` });
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  console.log(BACKEND_URL);
  console.log(product?.imageUrls);
  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  loading; /*eslint-disable-line @typescript-eslint/no-unused-vars*/
  error; /*eslint-disable-line @typescript-eslint/no-unused-vars*/

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
      <CartActionToast />
      <Grid>
        <ProductDetailImages
          className={classNames(
            styles["product-detail-page__images"],
            { "start-1 col-7": !isMobile },
            { "start-1 col-4": isMobile }
          )}
          imageUrls={product?.imageUrls}
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
            {product?.name}
          </h3>
          <h4 className={styles["product-detail-page__details__description"]}>
            {product?.description}
          </h4>
          <h2 className={styles["product-detail-page__details__price"]}>
            {product?.price}
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
              onClick={() => {
                addToCart(productIdNumber, quantity);
                toast(`Dodano do koszyka`, {
                  action: {
                    label: "Zobacz koszyk",
                    onClick: () => navigate("/shopping-cart"),
                  },
                });
              }}
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
