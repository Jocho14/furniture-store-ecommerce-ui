import React from "react";
import classNames from "classnames";

import { Star } from "iconoir-react";
import styles from "./styles.module.scss";

const numberOfStars = 5;

interface StarsIndicatorProps {
  percentage: number;
  size?: "small" | "medium" | "large";
}

const StarsIndicator: React.FC<StarsIndicatorProps> = ({
  percentage,
  size = "medium",
}) => {
  const filledStars = Math.round((percentage / 100) * numberOfStars);
  return (
    <div className={styles["stars-indicator"]}>
      {[...Array(numberOfStars)].map((_, index) => (
        <div
          className={classNames(styles["star-container"], styles[`${size}`])}
          key={index}
        >
          <Star
            width={size === "small" ? 14 : 24}
            height={size === "small" ? 14 : 24}
            className={`${styles["star-icon"]} ${
              index < filledStars ? styles["filled"] : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default StarsIndicator;
