import React from "react";

import Grid from "@/components/Grid/Grid";
// import useFetch from "@/hooks/useFetch";

import styles from "./styles.module.scss";

interface Props {}

const HomePage: React.FC<Props> = () => {
  return (
    <div className={styles["home-page"]}>
      <Grid>
        <div>HomePage</div>
      </Grid>
    </div>
  );
};

export default HomePage;
