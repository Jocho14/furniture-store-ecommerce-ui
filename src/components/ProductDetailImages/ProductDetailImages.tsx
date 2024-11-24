import React, { useState, useEffect } from "react";
import classNames from "classnames";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import DotPageIndicator from "@/components/DotPageIndicator/DotPageIndicator";

import useMobile from "@/hooks/useMobile";

import styles from "./styles.module.scss";

interface ProductDetailImagesProps {
  imageUrls: string[] | undefined;
  className?: string;
}

const ProductDetailImages: React.FC<ProductDetailImagesProps> = ({
  imageUrls,
  className,
}) => {
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isMobile = useMobile();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentIndex(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className={classNames(styles["product-detail-images"], className)}>
      <div className={styles["product-detail-images__main"]}>
        <div className={styles["product-detail-images__thumbnails"]}>
          {imageUrls?.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleThumbnailClick(index)}
              className={classNames(styles.thumbnail, {
                [styles.active]: currentIndex === index,
              })}
            />
          ))}
        </div>

        <Carousel
          className={classNames(
            styles["product-detail-images__current-image"],
            "flex items-center"
          )}
          setApi={setApi}
        >
          <CarouselContent>
            {imageUrls?.map((imageUrl, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card className="border-none">
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <img src={imageUrl} alt={`Product ${index + 1}`} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {!isMobile && (imageUrls?.length ?? 0) > 1 && <CarouselPrevious />}
          {!isMobile && (imageUrls?.length ?? 0) > 1 && <CarouselNext />}
        </Carousel>
      </div>
      {isMobile && (
        <DotPageIndicator
          count={imageUrls ? imageUrls.length : 1}
          currentIndex={currentIndex}
          onClick={handleThumbnailClick}
          className={styles["product-detail-images__dots"]}
        />
      )}
    </div>
  );
};

export default ProductDetailImages;
