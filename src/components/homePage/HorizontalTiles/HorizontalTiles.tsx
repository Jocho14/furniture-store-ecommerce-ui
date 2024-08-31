import React from "react";

import { HomePageProduct } from "@/interfaces/Product";

import styles from "./styles.module.scss";

interface HorizontalTilesProps {
  contentItems: HomePageProduct[];
}

const HorizontalTiles: React.FC<HorizontalTilesProps> = ({ contentItems }) => {
  return (
    <div className={styles["horizontal-tiles"]}>
      {contentItems?.map((item) => {
        return (
          <div className={styles["horizontal-tiles__item"]}>
            <div className={styles["horizontal-tiles__item__chip"]}>
              {item.name}
            </div>
            <img
              key={item.id}
              className={styles["horizontal-tiles__item__img"]}
              src={item.imageUrls[0]}
              alt={item.name}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalTiles;
