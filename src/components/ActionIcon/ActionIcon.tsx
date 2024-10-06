import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./styles.module.scss";

interface ActionIconProps {
  icon: React.ReactElement;
  label?: string;
  labelVisibility?: string;
  size?: "small" | "large";
  border?: "border-medium" | "border-large";
  linkTo?: string;
  onClick?: () => void;
  className?: string;
}

const ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
  (
    {
      icon,
      label,
      labelVisibility,
      size,
      border,
      linkTo,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const iconElement = React.cloneElement(icon, {
      className: classNames(styles.icon),
      ...props,
    });

    if (linkTo) {
      return (
        <Link
          to={linkTo}
          onClick={onClick}
          className={classNames(
            styles["icon-wrapper"],
            styles[`${size}`],
            styles[`${border}`]
          )}
        >
          <div
            className={classNames(styles["icon-container"], styles[`${size}`])}
          >
            {iconElement}{" "}
            <span
              className={
                label
                  ? classNames(styles[`label`], styles[`${labelVisibility}`])
                  : ""
              }
            >
              {label}
            </span>
          </div>
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={classNames(
          styles["icon-wrapper"],
          className,
          styles[`${size}`],
          styles[`${border}`]
        )}
      >
        <div
          className={classNames(styles["icon-container"], styles[`${size}`])}
        >
          {iconElement}{" "}
          <span
            className={
              label
                ? classNames(styles[`label`], styles[`${labelVisibility}`])
                : ""
            }
          >
            {label}
          </span>
        </div>
      </button>
    );
  }
);

ActionIcon.displayName = "ActionIcon";

export default ActionIcon;
