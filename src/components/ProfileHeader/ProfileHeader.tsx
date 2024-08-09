import React from "react";
import styles from "./styles.module.scss";

interface ProfileHeaderProps {
  name: string;
  surname: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, surname }) => {
  const capitalizedInitials = name[0].toUpperCase() + surname[0].toUpperCase();
  return (
    <div className={styles["user-header__wrapper"]}>
      <div className={styles["user-header__container"]}>
        {capitalizedInitials}
      </div>
      <span
        className={styles["user-header__name"]}
      >{`${name} ${surname}`}</span>
    </div>
  );
};

export default ProfileHeader;
