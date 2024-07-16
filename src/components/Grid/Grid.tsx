import React, { ReactNode } from "react";
import classNames from "classnames";
import "./styles.scss";

interface GridProps {
  children: ReactNode;
  className?: string;
}

const Grid: React.FC<GridProps> = ({ children, className }) => {
  console.log("rerender");
  const getResponsiveClass = (
    index: number,
    start: number,
    col: number,
    align: string
  ) => {
    return `start-${start} col-${col} ${align}`;
  };

  return (
    <div className={classNames("grid__wrapper")}>
      <div className={classNames("grid__container", className)}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          const element = child as React.ReactElement;

          const isHidden = element.props.className?.match(/grid-hidden/);
          if (isHidden) return null;

          const alignMatch = element.props.className?.match(/align-([\w-]+)/);
          const align = alignMatch ? alignMatch[0] : null;

          const start = parseInt(
            element.props.className?.match(/start-(\d+)/)?.[1] || "1"
          );

          const col = parseInt(
            element.props.className?.match(/col-(\d+)/)?.[1] || "1"
          );

          const responsiveClass = getResponsiveClass(index, start, col, align);
          return (
            <div className={`grid__item ${responsiveClass}`}>{element}</div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
