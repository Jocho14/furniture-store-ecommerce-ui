import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
          >
            Modern Furniture Transparent Background PNG
          </a>
          Transform Your Space with Luna
        </span>
        <span className={styles["landing__container__info"]}>
          Discover beautiful and comfortable furniture that brings warmth and
          style to your home.
        </span>
        <div className={styles["landing__container__buttons"]}>
          <Link to="/product">
            <Button>Shop Now</Button>
          </Link>
          <Button
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
