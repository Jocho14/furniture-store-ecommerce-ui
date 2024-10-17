import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

interface ImageContainerProps {
  imageUrl: string;
  alt: string;
  name: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
  imageUrl,
  alt,
  name,
}) => {
  return (
    <div className={classNames(styles["image-card-wrapper"])}>
      <div className={styles["image-card-container"]}>
        <img className={styles["image-card-img"]} src={imageUrl} alt={alt} />
        <h3 className={styles["image-card-name"]}>{name}</h3>
      </div>
    </div>
  );
};

export default ImageContainer;
