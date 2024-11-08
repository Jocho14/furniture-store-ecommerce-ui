import React from "react";
import classNames from "classnames";

import ActionIcon from "@/components/ActionIcon/ActionIcon";

import { Upload } from "iconoir-react";

import styles from "./styles.module.scss";

interface ImageUploadButtonProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onUpload }) => {
  return (
    <div>
      <ActionIcon
        icon={<Upload />}
        className={classNames(
          styles["upload-icon"],
          "border bg-primary-foreground"
        )}
        label="Add image"
        border="border-medium"
        isInput={true}
        multiple={true}
        onChange={onUpload}
      />
    </div>
  );
};

export default ImageUploadButton;
