import React from "react";
import classNames from "classnames";
import Grid from "@/components/Grid/Grid";
import MasonryGrid from "@/components/homePage/MasonryGrid/MasonryGrid";
import HorizontalTiles from "@/components/homePage/HorizontalTiles/HorizontalTiles";
import ProductFetcher from "@/components/ProductFetcher/ProductFetcher";
import useMobile from "@/hooks/useMobile";
import HorizontalScrollContainer from "@/components/HorizontalScrollContainer/HorizontalScrollContainer";

import styles from "./styles.module.scss";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const isMobile = useMobile();

  return (
    <div className={styles["home-page"]}>
      <Grid className={styles["home-page__container"]}>
        <div
          className={classNames(
            styles["masonry-grid"],
            { "start-1 col-12": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          {/* <ProductFetcher
            render={(products: any) => <MasonryGrid contentItems={products} />}
          /> */}
        </div>

        <div
          className={classNames(
            styles["horizontal-tiles"],
            { "start-1 col-12": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          <HorizontalScrollContainer className={styles["scroll-container"]}>
            {/* <ProductFetcher
              render={(products: any) => (
                <HorizontalTiles contentItems={products} />
              )}
            /> */}
            <div></div>
          </HorizontalScrollContainer>
        </div>
      </Grid>
    </div>
  );
};

export default HomePage;
