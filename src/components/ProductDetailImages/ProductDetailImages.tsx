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

import styles from "./styles.module.scss";

interface ProductDetailImagesProps {
  imageUrls: string[];
  className?: string;
}

const ProductDetailImages: React.FC<ProductDetailImagesProps> = ({
  imageUrls,
  className,
}) => {
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
      <div className={styles["product-detail-images__thumbnails"]}>
        {imageUrls.map((imageUrl, index) => (
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
          {imageUrls.map((imageUrl, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center">
                    <img src={imageUrl} alt={`Product ${index + 1}`} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProductDetailImages;
