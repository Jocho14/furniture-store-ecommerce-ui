import React from "react";

import { Card } from "@/components/ui/card";

import styles from "./styles.module.scss";

interface FavouriteProductProps {
  thumbnailUrl: string;
  name: string;
}

const FavouriteProduct: React.FC<FavouriteProductProps> = ({
  thumbnailUrl,
  name,
}) => {
  return (
    <Card className={styles["favourite-product"]}>
      <img src={thumbnailUrl} alt={name} />
      <h1>{name}</h1>
    </Card>
  );
};

export default FavouriteProduct;
