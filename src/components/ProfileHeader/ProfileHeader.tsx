import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

interface ProfileHeaderProps {
  name: string;
  surname?: string;
  size?: "small" | "medium" | "large";
  disableLabel?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  surname,
  size,
  disableLabel = false,
}) => {
  let capitalizedInitials = name[0].toUpperCase();
  if (surname) {
    capitalizedInitials += surname[0].toUpperCase();
  }

  return (
    <div
      className={classNames(styles["user-header__wrapper"], styles[`${size}`])}
    >
      <div
        className={classNames(
          styles["user-header__container"],
          styles[`${size}`]
        )}
      >
        {capitalizedInitials}
      </div>
      {!disableLabel && (
        <span
          className={classNames(styles["user-header__name"], styles[`${size}`])}
        >{`${name} ${surname ? surname : ""}`}</span>
      )}
    </div>
  );
};

export default ProfileHeader;
