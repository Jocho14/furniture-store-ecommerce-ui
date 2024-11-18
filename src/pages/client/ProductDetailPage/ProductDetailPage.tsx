import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import classNames from "classnames";
import { toast } from "sonner";

import Grid from "@/components/Grid/Grid";
import QuantityStepper from "@/components/QuantityStepper/QuantityStepper";
import CartActionToast from "@/components/CartActionToast/CartActionToast";
import ProductDetailImages from "@/components/ProductDetailImages/ProductDetailImages";
import { getProductDetails } from "@/api/client/products";
import ReviewsDialog from "@/components/ReviewsDialog/ReviewsDialog";

import useMobile from "@/hooks/useMobile";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/context/client/CartContext";

import styles from "./styles.module.scss";
import { Button } from "@/components/ui/button";

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

  const { data: product } = useQuery<Product>({
    queryKey: ["productDetails", productIdNumber],
    queryFn: () => getProductDetails(productIdNumber),
    staleTime: 1000 * 60 * 5,
  });

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

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
                toast(`Added to cart`, {
                  action: {
                    label: "Go to cart",
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
                Add to cart
              </span>
            </button>
          </div>
        </div>
        <div
          className={classNames(
            styles["product-detail-page__secondary__details"],
            { "start-1 col-8": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          <ReviewsDialog
            trigger={<Button variant="link">click me</Button>}
            productName={product?.name || ""}
          />
        </div>
      </Grid>
    </div>
  );
};

export default ProductDetailPage;
