import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./styles.module.scss";

interface ActionIconProps {
  icon: React.ReactElement;
  size?: "small" | "large";
  linkTo?: string;
  onClick?: () => void;
  className?: string;
}

const ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
  ({ icon, size, linkTo, onClick, className, ...props }, ref) => {
    const iconElement = React.cloneElement(icon, {
      className: classNames(styles.icon, className),
      ...props,
    });

    if (linkTo) {
      return (
        <Link
          to={linkTo}
          onClick={onClick}
          className={classNames(styles["icon-container"], styles[`${size}`])}
        >
          {iconElement}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={classNames(styles["icon-container"], styles[`${size}`])}
      >
        {iconElement}
      </button>
    );
  }
);

ActionIcon.displayName = "ActionIcon";

export default ActionIcon;
