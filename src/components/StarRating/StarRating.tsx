import React, { useState } from "react";

import { Star } from "iconoir-react";
import styles from "./styles.module.scss";

interface StarRatingProps {
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ onRatingChange }) => {
  const [rating, setRating] = useState(1);

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className={styles["star-rating"]}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          onClick={() => handleClick(index)}
          className={styles["star"]}
          fill={index < rating ? "#1d1d1d" : "#ffffff"}
          width={36}
          height={36}
        />
      ))}
    </div>
  );
};

export default StarRating;
