import React from "react";

import Grid from "@/components/Grid/Grid";
import useFetch from "@/hooks/useFetch";

import styles from "./styles.module.scss";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const { data, error, loading } = useFetch({
    url: "https://api.sampleapis.com/coffee/hot",
  });

  return (
    <div className={styles["home-page"]}>
      <Grid>
        <div>{JSON.stringify(data)}</div>
      </Grid>
    </div>
  );
};

export default HomePage;
