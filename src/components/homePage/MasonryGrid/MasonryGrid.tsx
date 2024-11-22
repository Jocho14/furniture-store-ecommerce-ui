import React from "react";
import classNames from "classnames";

import { MasonryContent } from "@/interfaces/Product";
import { useNavigate, Link } from "react-router-dom";
import useMobile from "@/hooks/useMobile";

import styles from "./styles.module.scss";

interface MasonryGridProps {
  content: MasonryContent | undefined;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ content }) => {
  const isMobile = useMobile();
  const navigate = useNavigate();

  return (
    <div className={styles["masonry-grid"]}>
      {Array.isArray(content?.imageUrls) &&
        content.imageUrls.map((imageUrl, index) => {
          if ((index === 3 && !isMobile) || (isMobile && index === 5)) {
            return (
              <Link to={`/product?categories=${content.name}`} key={imageUrl}>
                <div
                  className={classNames(
                    styles["masonry-grid__discount-info"],
                    styles["masonry-grid__item"]
                  )}
                >
                  <span className={styles["masonry-grid__discount-info__span"]}>
                    {`See more ${content.name} furniture`}
                  </span>
                </div>
              </Link>
            );
          }
          return (
            <img
              key={imageUrl}
              className={styles["masonry-grid__item"]}
              src={imageUrl}
              alt={content.name}
              onClick={() => {
                navigate(`/product?categories=${content.name}`);
              }}
            />
          );
        })}
    </div>
  );
};

export default MasonryGrid;
