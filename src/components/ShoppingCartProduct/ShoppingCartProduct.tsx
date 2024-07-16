import React from "react";

import classNames from "classnames";

import styles from "./styles.module.scss";

interface ShoppingCartProductProps {
  title: string;
  image: string;
  description: string;
  price: number;
  className?: string;
}

const ShoppingCartProduct: React.FC<ShoppingCartProductProps> = (props) => {
  return (
    <div className={classNames(styles["product__container"])}>
      <div className={styles["product__container__image"]}>
        <img src={props.image} alt={props.title} />
      </div>

      <div className={styles["product__container__details"]}>
        <h2>{props.title}</h2>
        <h4>{props.description}</h4>
        {/*TODO: implement counter*/}
      </div>

      <div className={styles["product__container__price"]}>
        <h4>{props.price}</h4>
      </div>
    </div>
  );
};

export default ShoppingCartProduct;
