import React from "react";
import classNames from "classnames";

import { HomePageProduct } from "@/interfaces/Product";

import useMobile from "@/hooks/useMobile";

import styles from "./styles.module.scss";

interface MasonryGridProps {
  contentItems: HomePageProduct[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ contentItems }) => {
  const isMobile = useMobile();
  return (
    <div className={styles["masonry-grid"]}>
      {contentItems?.map((item, index) => {
        if ((index === 3 && !isMobile) || (isMobile && index === 5)) {
          return (
            <div
              className={classNames(
                styles["masonry-grid__discount-info"],
                styles["masonry-grid__item"]
              )}
            >
              <span className={styles["masonry-grid__discount-info__span"]}>
                Do -30% na krzesła
              </span>
            </div>
          );
        }
        return (
          <img
            key={item.id}
            className={styles["masonry-grid__item"]}
            src={item.imageUrls[0]}
            alt={item.name}
          />
        );
      })}
    </div>
  );
};

export default MasonryGrid;
