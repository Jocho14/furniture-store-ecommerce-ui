import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

interface HorizontalTileProduct {
  name: string;
  imageUrl: string;
}

interface HorizontalTilesProps {
  contentItems: HorizontalTileProduct[];
}

const HorizontalTiles: React.FC<HorizontalTilesProps> = ({ contentItems }) => {
  return (
    <div className={styles["horizontal-tiles"]}>
      {Array.isArray(contentItems) &&
        contentItems.map((item) => {
          return (
            <Link to={`product?categories=${item.name}`}>
              <div key={item.name} className={styles["horizontal-tiles__item"]}>
                <div className={styles["horizontal-tiles__item__chip"]}>
                  {item.name}
                </div>
                <img
                  className={styles["horizontal-tiles__item__img"]}
                  src={item.imageUrl}
                  alt={item.name}
                />
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default HorizontalTiles;
