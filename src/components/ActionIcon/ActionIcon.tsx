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
  isInput?: boolean;
  multiple?: boolean;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      isInput = false,
      multiple = false,
      onChange,
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

    if (isInput) {
      return (
        <label
          className={classNames(
            className,
            styles["icon-wrapper"],
            styles[`${size}`],
            styles[`${border}`]
          )}
        >
          <input
            type="file"
            multiple={multiple}
            onChange={onChange}
            className={classNames(styles["input"], "hidden")}
          />
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
        </label>
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
