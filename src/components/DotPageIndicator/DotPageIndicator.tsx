import React, { useEffect, useState } from "react";
import classNames from "classnames";
import _ from "lodash";

import styles from "./styles.module.scss";

const DOT_DIAMETER = 8;

const scaleValueForIndex = (index: number): number =>
  _.clamp(1 + (2 / 15) * index - (1 / 15) * index * index, 0, 1);

interface DotPageIndicatorProps {
  count: number;
  currentIndex: number;
  onClick: (index: number) => void;
  className?: string;
}

const DotPageIndicator: React.FC<DotPageIndicatorProps> = ({
  count,
  currentIndex,
  onClick,
  className,
}) => {
  const [fromIndex, setFromIndex] = useState<number>(
    Math.max(0, currentIndex - 2)
  );
  const [toIndex, setToIndex] = useState<number>(
    Math.min(count - 1, currentIndex + 2)
  );

  useEffect(() => {
    if (currentIndex === fromIndex) {
      setFromIndex(currentIndex - 1);
      setToIndex(currentIndex + 1);
    } else if (currentIndex === toIndex) {
      setFromIndex(currentIndex - 1);
      setToIndex(currentIndex + 1);
    }
  }, [currentIndex, fromIndex, toIndex]);

  const visibleRange = _.range(
    Math.max(0, fromIndex - 2),
    Math.min(toIndex + 3, count)
  );

  const visibleWidth =
    visibleRange.reduce(
      (previous, index) =>
        previous + DOT_DIAMETER * scaleValueForIndex(index - fromIndex),
      0
    ) +
    (visibleRange.length - 1) * DOT_DIAMETER;

  return (
    <div className={classNames(styles["dot-page-indicator"], className)}>
      {_.range(count).map((index) => {
        const scale = scaleValueForIndex(index - fromIndex);

        const translateX =
          _.range(0, index).reduce(
            (previous, idx) =>
              previous +
              DOT_DIAMETER * scaleValueForIndex(idx - fromIndex) +
              DOT_DIAMETER,
            0
          ) -
          Math.max(0, fromIndex - 2) * DOT_DIAMETER -
          visibleWidth / 2;

        return (
          <div
            key={index}
            className={classNames(
              styles.dot,
              {
                [styles.active]: currentIndex === index,
              },
              styles["dot-page-indicator__dot"]
            )}
            onClick={() => {
              onClick(index);
              setFromIndex(Math.max(0, index - 2));
              setToIndex(Math.min(count - 1, index + 2));
            }}
            style={{
              opacity: currentIndex === index ? 1 : 0.5,
              transform: `translateX(${translateX}px) scale(${scale})`,
            }}
          />
        );
      })}
    </div>
  );
};

export default DotPageIndicator;
