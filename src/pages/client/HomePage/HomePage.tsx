import React from "react";
import classNames from "classnames";
import Grid from "@/components/Grid/Grid";
import MasonryGrid from "@/components/homePage/MasonryGrid/MasonryGrid";
import HorizontalTiles from "@/components/homePage/HorizontalTiles/HorizontalTiles";
import ProductFetcher from "@/components/ProductFetcher/ProductFetcher";
import useMobile from "@/hooks/useMobile";
import HorizontalScrollContainer from "@/components/HorizontalScrollContainer/HorizontalScrollContainer";
import Landing from "@/components/Landing/Landing";
import { useQuery } from "@tanstack/react-query";
import { getMasonryContent } from "@/api/client/products";
import { MasonryContent } from "@/interfaces/Product";

import styles from "./styles.module.scss";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const isMobile = useMobile();

  const { data: masonryContentData, isLoading: masonryContentLoading } =
    useQuery<MasonryContent>({
      queryKey: ["masonryContent"],
      queryFn: () => getMasonryContent(1),
      staleTime: 1000 * 60 * 5,
    });

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
          <Landing />
        </div>
        <div
          className={classNames(
            styles["masonry-grid"],
            { "start-1 col-12": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          <MasonryGrid content={masonryContentData} />
        </div>

        <div
          className={classNames(
            styles["horizontal-tiles"],
            { "start-1 col-12": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          {/* <HorizontalScrollContainer className={styles["scroll-container"]}>
            <ProductFetcher
              render={(products: any) => (
                <HorizontalTiles contentItems={products} />
              )}
            />
          </HorizontalScrollContainer> */}
        </div>
      </Grid>
    </div>
  );
};

export default HomePage;
