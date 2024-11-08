import React from "react";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/button";

interface Props {}

const Landing: React.FC<Props> = () => {
  return (
    <div className={styles["landing"]}>
      <div className={styles["landing__container"]}>
        <span className={styles["landing__container__title"]}>
          Transform Your Space with {`[Website name]`}
        </span>
        <span className={styles["landing__container__info"]}>
          Discover beautiful, comfortable furniture that brings warmth and style
          to your home.
        </span>
        <div className={styles["landing__container__buttons"]}>
          <Button>Shop Now</Button>
          <Button variant="secondary">Discover</Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
