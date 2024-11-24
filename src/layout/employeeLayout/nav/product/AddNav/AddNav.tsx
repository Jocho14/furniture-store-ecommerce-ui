import { useHeader } from "@/context/employee/HeaderContext";

import ActionIcon from "@/components/ActionIcon/ActionIcon";

import { FloppyDisk, ArrowLeft } from "iconoir-react";
import styles from "./styles.module.scss";

const AddNav = () => {
  const { save } = useHeader();
  return (
    <nav className={styles["add-nav"]}>
      <div className={styles["add-nav__left"]}>
        <ActionIcon
          className={styles["arrow-icon"]}
          icon={<ArrowLeft />}
          linkTo="/employee/product/list"
          border="border-medium"
        />
        <div className={styles["add-nav__left-info"]}>
          <span className={styles["add-nav__left-info__secondary"]}>
            Back to list
          </span>
          <span className={styles["add-nav__left-info__primary"]}>
            Adding product
          </span>
        </div>
      </div>
      <div className={styles["add-icon__container"]}>
        <ActionIcon
          className={styles["add-icon"]}
          icon={<FloppyDisk />}
          label="Save changes"
          border="border-medium"
          onClick={save}
        />
      </div>
    </nav>
  );
};

export default AddNav;
