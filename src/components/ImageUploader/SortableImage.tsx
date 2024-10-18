import React from "react";
import classNames from "classnames";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import ImageCard from "@/components/ImageUploader/ImageCard";
import ActionIcon from "@/components/ActionIcon/ActionIcon";
import DragHandle from "@/assets/icons/DragHandle";
import PopupAlert from "@/components/PopupAlert/PopupAlert";

import { Trash } from "iconoir-react";

import styles from "./styles.module.scss";

interface SortableImageProps {
  id: string;
  url: string;
  name: string;
  removeImage: (id: string) => void;
}

const SortableImage: React.FC<SortableImageProps> = ({
  id,
  url,
  name,
  removeImage,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? "#f0f0f0" : "#fff",
    zIndex: isDragging ? 999 : "auto",
    position: isDragging ? "relative" : "static",
  };

  return (
    <div
      ref={setNodeRef}
      className={classNames(
        styles["image-container"],
        "rounded-lg border shadow-sm"
      )}
      style={style}
    >
      <div className="w-full flex items-center">
        <div
          {...listeners}
          {...attributes}
          className={styles["image-container-draggable-area"]}
        >
          <DragHandle width={"25px"} height={"25px"} fill="#b6b6b6" />
        </div>
        <ImageCard imageUrl={url} name={name} alt="Uploaded" />
        <PopupAlert
          handleConfirm={() => removeImage(id)}
          primaryAction="cancel"
          trigger={
            <ActionIcon
              icon={<Trash />}
              border="border-medium"
              size="small"
              className="z-10 mr-3"
            />
          }
        />
      </div>
    </div>
  );
};

export default SortableImage;
