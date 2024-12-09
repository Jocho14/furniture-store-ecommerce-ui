import React from "react";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";

import {
  getHorizontalTilesContent,
  getMasonryContent,
} from "@/api/client/products";

import Grid from "@/components/Grid/Grid";
import Landing from "@/components/Landing/Landing";
import MasonryGrid from "@/components/homePage/MasonryGrid/MasonryGrid";
import HorizontalTiles from "@/components/homePage/HorizontalTiles/HorizontalTiles";
import useMobile from "@/hooks/useMobile";
import HorizontalScrollContainer from "@/components/HorizontalScrollContainer/HorizontalScrollContainer";

import { MasonryContent } from "@/interfaces/Product";

import styles from "./styles.module.scss";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const isMobile = useMobile();

  const { data: masonryContentData } = useQuery<MasonryContent>({
    queryKey: ["masonryContent"],
    queryFn: () => getMasonryContent(1),
    staleTime: 1000 * 60 * 5,
  });

  console.log(masonryContentData);

  const { data: horizontalTilesItems } = useQuery({
    queryKey: ["horizontalTilesItems"],
    queryFn: () => getHorizontalTilesContent(1),
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
          <HorizontalScrollContainer className={styles["scroll-container"]}>
            <HorizontalTiles contentItems={horizontalTilesItems} />
          </HorizontalScrollContainer>
        </div>
      </Grid>
    </div>
  );
};

export default HomePage;
