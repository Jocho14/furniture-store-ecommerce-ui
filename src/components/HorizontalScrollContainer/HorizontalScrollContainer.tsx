import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";

import { NavArrowLeft, NavArrowRight } from "iconoir-react";

import styles from "./styles.module.scss";

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({
  children,
  className,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [hitLeftEdge, setHitLeftEdge] = useState(true);
  const [hitRightEdge, setHitRightEdge] = useState(false);

  const handleLeftArrowClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -containerRef.current.clientWidth * 0.6,
        behavior: "smooth",
      });
    }
  };

  const handleRightArrowClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.clientWidth * 0.6,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (containerRef.current) {
    }
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollLeft = containerRef.current.scrollLeft;

        const maxScrollLeft =
          containerRef.current.scrollWidth - containerRef.current.clientWidth;

        if (scrollLeft === 0) {
          setHitLeftEdge(true);
        } else if (scrollLeft === maxScrollLeft) {
          setHitRightEdge(true);
        } else {
          setHitLeftEdge(false);
          setHitRightEdge(false);
        }
      }
    };
    if (containerRef.current) {
      const scrollContainer = containerRef.current;
      scrollContainer.addEventListener("scroll", handleScroll);

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div
      className={classNames(styles["horizontal-scroll-wrapper"], className)}
      ref={wrapperRef}
      onMouseMove={(e) => {
        const container = e.currentTarget;
        const { left, right } = container.getBoundingClientRect();
        const mouseX = e.clientX;
        setShowLeftArrow(mouseX < left + 200 && !hitLeftEdge);
        setShowRightArrow(mouseX > right - 200 && !hitRightEdge);
      }}
      onMouseLeave={() => {
        setShowLeftArrow(false);
        setShowRightArrow(false);
      }}
    >
      {showLeftArrow && (
        <button
          aria-label="Scroll left"
          className={classNames(
            styles["horizontal-scroll-wrapper__left-nav-arrow"],
            {
              [styles["show-arrow"]]: showLeftArrow,
            }
          )}
          onClick={handleLeftArrowClick}
        >
          <NavArrowLeft className={styles["test-icon"]} />
        </button>
      )}
      <div className={styles["horizontal-scroll-container"]} ref={containerRef}>
        {children}
      </div>
      {showRightArrow && (
        <button
          aria-label="Scroll right"
          className={classNames(
            styles["horizontal-scroll-wrapper__right-nav-arrow"],
            {
              [styles["show-arrow"]]: showRightArrow,
            }
          )}
          onClick={handleRightArrowClick}
        >
          <NavArrowRight className={styles["test-icon"]} />
        </button>
      )}
    </div>
  );
};

export default HorizontalScrollContainer;
