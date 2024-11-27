import { useHeader } from "@/context/employee/HeaderContext";

import ActionIcon from "@/components/ActionIcon/ActionIcon";
import PopupAlert from "@/components/PopupAlert/PopupAlert";

import { ArrowLeft, Xmark } from "iconoir-react";
import styles from "./styles.module.scss";

const ManageCanceledNav = () => {
  return (
    <nav className={styles["edit-nav"]}>
      <div className={styles["edit-nav__left"]}>
        <ActionIcon
          className={styles["arrow-icon"]}
          icon={<ArrowLeft />}
          linkTo="/employee/order/list"
          border="border-medium"
        />
        <div className={styles["edit-nav__left-info"]}>
          <span className={styles["edit-nav__left-info__secondary"]}>
            Back to list
          </span>
          <span className={styles["edit-nav__left-info__primary"]}>
            Managing order
          </span>
        </div>
      </div>
    </nav>
  );
};

export default ManageCanceledNav;
