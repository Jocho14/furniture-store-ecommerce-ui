import { useHeader } from "@/context/employee/HeaderContext";

import { FloppyDisk, ArrowLeft } from "iconoir-react";

import ActionIcon from "@/components/ActionIcon/ActionIcon";

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
            Powrót do listy
          </span>
          <span className={styles["add-nav__left-info__primary"]}>
            Dodawanie produktu
          </span>
        </div>
      </div>
      <div className={styles["add-icon__container"]}>
        <ActionIcon
          className={styles["add-icon"]}
          icon={<FloppyDisk />}
          label="Zapisz zmiany"
          border="border-medium"
          onClick={save}
        />
      </div>
    </nav>
  );
};

export default AddNav;
