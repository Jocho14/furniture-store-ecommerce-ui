import React from "react";
import styles from "./styles.module.scss";
import StarsIndicator from "../StarsIndicator/StarsIndicator";
import ProfileHeader from "../ProfileHeader/ProfileHeader";

export interface ReviewProps {
  reviewId: number;
  reviewerName: string;
  rating: number;
  comment: string;
  reviewDate: string;
}

const getRatingPercentage = (rating: number) => {
  return (rating / 5) * 100;
};

const Review: React.FC<ReviewProps> = ({
  rating,
  comment,
  reviewerName,
  reviewDate,
}) => {
  return (
    <div className={styles["review"]}>
      <div className={styles["review__rating"]}>
        <StarsIndicator percentage={getRatingPercentage(rating)} size="small" />{" "}
        • <span className={styles["review__date"]}>{reviewDate}</span>
      </div>
      <div className={styles["review__description"]}>{comment}</div>
      <div className={styles["review__reviewer"]}>
        <ProfileHeader name={reviewerName} size="small" />
      </div>
    </div>
  );
};

export default Review;
