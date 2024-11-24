import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { toast } from "sonner";

import {
  addToFavorites,
  removeFromFavorites,
  checkFavourite,
} from "@/api/client/products";
import { getProductDetails } from "@/api/client/products";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Grid from "@/components/Grid/Grid";
import ActionIcon from "@/components/ActionIcon/ActionIcon";
import QuantityStepper from "@/components/QuantityStepper/QuantityStepper";
import CartActionToast from "@/components/CartActionToast/CartActionToast";
import ProductDetailImages from "@/components/ProductDetailImages/ProductDetailImages";
import ReviewsDialog from "@/components/ReviewsDialog/ReviewsDialog";

import { useCart } from "@/context/client/CartContext";

import useMobile from "@/hooks/useMobile";

import { ArrowRight, Heart, HeartSolid } from "iconoir-react";
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
  const [isFavourite, setIsFavourite] = useState(false);
  const queryClient = useQueryClient();

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

  const { data: isFavouriteData } = useQuery({
    queryKey: ["isFavourite", productId],
    queryFn: () => checkFavourite(Number(productId)),
  });

  useEffect(() => {
    if (isFavouriteData) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [isFavouriteData]);

  const addMutation = useMutation({
    mutationFn: () => addToFavorites(Number(productId)),
    onSuccess: () => {
      setIsFavourite(true);
      queryClient.invalidateQueries({ queryKey: ["favouriteProducts"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => removeFromFavorites(Number(productId)),
    onSuccess: () => {
      setIsFavourite(false);
      queryClient.invalidateQueries({ queryKey: ["favouriteProducts"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

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
          <div className="flex justify-between">
            <h3 className={styles["product-detail-page__details__name"]}>
              {product?.name}
            </h3>
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
              onClick={() => {
                isFavourite ? removeMutation.mutate() : addMutation.mutate();
              }}
            />
          </div>

          <h2 className={styles["product-detail-page__details__price"]}>
            {product?.price}zł
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
          <h4 className={styles["product-detail-page__details__description"]}>
            {product?.description}
          </h4>
          <Separator />
          <div>
            <ReviewsDialog
              trigger={
                <Button
                  variant="link"
                  className={classNames(
                    styles[
                      "product-detail-page__secondary__details__review-btn"
                    ],
                    "p-0"
                  )}
                >
                  Reviews <ArrowRight height={20} />
                </Button>
              }
              productName={product?.name || ""}
            />
          </div>
        </div>
        <div
          className={classNames(
            styles["product-detail-page__secondary__details"],
            { "start-2 col-8": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          <Separator />
        </div>
      </Grid>
    </div>
  );
};

export default ProductDetailPage;
