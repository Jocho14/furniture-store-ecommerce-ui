import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import styles from "./styles.module.scss";

interface Props {}

const Landing: React.FC<Props> = () => {
  return (
    <div className={styles["landing"]}>
      <div className={styles["landing__container"]}>
        <span className={styles["landing__container__title"]}>
          <a
            className={styles["landing__container__title__a"]}
            href="https://www.pngarts.com/explore/162722"
            target="_blank"
            style={{ display: "inline-block", width: "100%", height: "auto" }}
          >
          </a>
          Transform Your Space with LUNA
        </span>
        <span className={styles["landing__container__info"]}>
          Discover beautiful and comfortable furniture that brings warmth and
          style to your home.
        </span>
        <div className={styles["landing__container__buttons"]}>
          <Link to="/product">
            <Button aria-label="shop now">Shop Now</Button>
          </Link>
          <Button
            aria-label="discover"
            variant="outline"
            onClick={() => window.scrollBy({ top: 900, behavior: "smooth" })}
          >
            Discover
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;