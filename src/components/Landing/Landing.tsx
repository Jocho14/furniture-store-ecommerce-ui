import React from "react";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/button";

interface Props {}

const Landing: React.FC<Props> = () => {
  return (
    <div className={styles["landing"]}>
      <div className={styles["landing__container"]}>
        <span className={styles["landing__container__title"]}>
          Witamy w LOGO !
        </span>
        <span className={styles["landing__container__info"]}>
          Odkryj komfort i styl do każdego pomieszczenia. Odmień swoją
          przestrzeń dzięki starannie wyselekcjonowanej kolekcji mebli.
        </span>
        <div className={styles["landing__container__buttons"]}>
          <Button>Zrób zakupy</Button>
          <Button variant="secondary">Odkrywaj</Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
