import React, { useState, useEffect, ReactNode } from "react";
import classNames from "classnames";

import "./styles.scss";

interface GridProps {
  children: ReactNode;
  className?: string;
}

const Grid: React.FC<GridProps> = ({ children, className }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getResponsiveClass = (index: number, start: number, col: number) => {
    if (width <= 767) {
      const newStart = ((start - 1) % 4) + 1;
      return `start-${newStart} col-${col}`;
    }
    return `start-${start} col-${col}`;
  };

  return (
    <div className={classNames("grid__wrapper")}>
      <div className={classNames("grid__container", className)}>
        {React.Children.map(children, (child, index) => {
          const element = child as React.ReactElement;

          const isHidden = element.props.className?.match(/grid-hidden/);
          if (isHidden) return null;

          const start = parseInt(
            element.props.className?.match(/start-(\d+)/)?.[1] || "1"
          );

          const col = parseInt(
            element.props.className?.match(/col-(\d+)/)?.[1] || "1"
          );

          const responsiveClass = getResponsiveClass(index, start, col);

          return (
            <div className={`grid__item ${responsiveClass}`}>{element}</div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
