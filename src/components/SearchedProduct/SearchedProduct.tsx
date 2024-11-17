import React from "react";
import styles from "./styles.module.scss";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export interface SearchedProductProps {
  productId: number;
  name: string;
  category: string;
  thumbnailUrl: string;
  link: string;
}

const SearchedProduct: React.FC<SearchedProductProps> = ({
  name,
  category,
  thumbnailUrl,
  link,
}) => {
  return (
    <Link to={link}>
      <div className={styles["search-product__container"]}>
        <img
          className={styles["search-product__container__image"]}
          src={thumbnailUrl}
        />
        <Button
          variant="link"
          className={styles["search-product__container__info"]}
        >
          <h4 className={styles["search-product__container__info__name"]}>
            {name}
          </h4>{" "}
          <h6 className={styles["search-product__container__info__category"]}>
            {category}
          </h6>
        </Button>
      </div>
    </Link>
  );
};

export default SearchedProduct;
