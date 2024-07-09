import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface GridProps {
  children: ReactNode;
}

const Grid: React.FC<GridProps> = (props: GridProps) => {
  return (
    <div className={styles.grid__wrapper}>
      <div className={styles.grid__container}>{props.children}</div>
    </div>
  );
};

export default Grid;
