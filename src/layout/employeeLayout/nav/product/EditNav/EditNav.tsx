import { useHeader } from "@/context/employee/HeaderContext";

import ActionIcon from "@/components/ActionIcon/ActionIcon";
import PopupAlert from "@/components/PopupAlert/PopupAlert";

import { FloppyDisk, ArrowLeft, TrashSolid } from "iconoir-react";
import styles from "./styles.module.scss";

const EditNav = () => {
  const { save, deactivate } = useHeader();
  return (
    <nav className={styles["edit-nav"]}>
      <div className={styles["edit-nav__left"]}>
        <ActionIcon
          className={styles["arrow-icon"]}
          icon={<ArrowLeft />}
          linkTo="/employee/product/list"
          border="border-medium"
        />
        <div className={styles["edit-nav__left-info"]}>
          <span className={styles["edit-nav__left-info__secondary"]}>
            Back to list
          </span>
          <span className={styles["edit-nav__left-info__primary"]}>
            Editing product
          </span>
        </div>
      </div>
      <div className={styles["edit-icon__container"]}>
        <PopupAlert
          handleConfirm={() => deactivate && deactivate()}
          primaryAction="cancel"
          trigger={
            <ActionIcon
              className={styles["edit-icon"]}
              icon={<TrashSolid />}
              label="Delete Product"
              border="border-medium"
            />
          }
        />
        <ActionIcon
          className={styles["edit-icon"]}
          icon={<FloppyDisk />}
          label="Save changes"
          border="border-medium"
          onClick={save}
        />
      </div>
    </nav>
  );
};

export default EditNav;
