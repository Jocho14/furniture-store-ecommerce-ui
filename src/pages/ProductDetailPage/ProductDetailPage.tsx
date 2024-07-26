import React from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames";
import Grid from "@/components/Grid/Grid";
import ProductDetailImages from "@/components/ProductDetailImages/ProductDetailImages";
import { productDetailImagesData } from "../../data/data";

import styles from "./styles.module.scss";

interface ProductDetailPageProps {}

const ProductDetailPage: React.FC<ProductDetailPageProps> = () => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div className={styles["product-detail-page__wrapper"]}>
      <Grid>
        <div className={styles["separator"]}></div>
        <ProductDetailImages
          className={"start-1 col-7"}
          imageUrls={productDetailImagesData}
        />
        <div className={styles["product-detail-page__details"]}></div>
      </Grid>
    </div>
  );
};

export default ProductDetailPage;
