import React, { useState, useEffect, ReactNode } from "react";
import classNames from "classnames";

import "./styles.scss";

interface GridProps {
  children: ReactNode;
  className?: string;
}

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const Grid: React.FC<GridProps> = ({ children, className }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = debounce(() => setWidth(window.innerWidth), 300);
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
