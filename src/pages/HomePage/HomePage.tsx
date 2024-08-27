import React from "react";
import classNames from "classnames";
import Grid from "@/components/Grid/Grid";
import MasonryGrid from "@/components/homePage/MasonryGrid/MasonryGrid";
import ProductFetcher from "@/components/ProductFetcher/ProductFetcher";
import useMobile from "@/hooks/useMobile";

import styles from "./styles.module.scss";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const isMobile = useMobile();

  return (
    <div className={styles["home-page"]}>
      <Grid>
        <div
          className={classNames(
            styles["masonry-grid"],
            { "start-1 col-12": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          <ProductFetcher
            render={(products: any) => <MasonryGrid contentItems={products} />}
          />
        </div>
      </Grid>
    </div>
  );
};

export default HomePage;
