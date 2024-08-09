import React from "react";

import styles from "./styles.module.scss";

interface Props {}

const Footer: React.FC<Props> = () => {
  return <footer className={styles["footer"]}>Footer</footer>;
};

export default Footer;
