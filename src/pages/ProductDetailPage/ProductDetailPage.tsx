import React from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames";
import Grid from "@/components/Grid/Grid";
import ProductDetailImages from "@/components/ProductDetailImages/ProductDetailImages";
import { productDetailImagesData } from "../../data/data";
import useMobile from "@/hooks/useMobile";

import styles from "./styles.module.scss";

interface ProductDetailPageProps {}

const ProductDetailPage: React.FC<ProductDetailPageProps> = () => {
  const { productId } = useParams<{ productId: string }>();
  const isMobile = useMobile();

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
          Product detailswwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
        </div>
      </Grid>
    </div>
  );
};

export default ProductDetailPage;
