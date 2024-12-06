import React from "react";
//import classNames from "classnames";

//import { iconsArray } from "@/utils/iconsArray";
import styles from "./styles.module.scss";

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["wrapper"]}>
        {/* {Array.from(
          { length: 9 }, // NOTE: When adding an icon to the array, modify the $number-of-items variable in the SCSS file
          (_, i) => (
            <img
              key={i}
              src={iconsArray[i]}
              className={classNames(styles["item"], styles[`item-${i + 1}`])}
              alt={`icon-${i + 1}`}
            ></img>
          )
        )} */}
        Footer
      </div>
    </footer>
  );
};

export default Footer;
