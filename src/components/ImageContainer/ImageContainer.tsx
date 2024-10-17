import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { TouchSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./styles.module.scss";
import ImageCard from "@/components/ImageContainer/ImageCard";
import { Trash } from "iconoir-react";
import DragHandle from "@/assets/icons/DragHandle";
import classNames from "classnames";
import ActionIcon from "../ActionIcon/ActionIcon";
import { Upload } from "iconoir-react";
import { Action } from "@radix-ui/react-alert-dialog";
import { Separator } from "@/components/ui/separator";
import { MediaImageList } from "iconoir-react";

const SortableImage = ({ id, url, name, removeImage }: any) => {
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
        "rounded-lg border  shadow-sm"
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
        <ActionIcon
          icon={<Trash />}
          border="border-medium"
          onClick={() => removeImage(id)}
          size="small"
          className="z-10 mr-3"
        />
      </div>
    </div>
  );
};

const ImageContainer = () => {
  const [images, setImages] = useState<
    Array<{ id: string; url: string; name: string }>
  >([]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      id: URL.createObjectURL(file),
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const thumbnail = images.length > 0 ? images[0].url : null;

  return (
    <div>
      <div className="h-[200px] rounded-lg border shadow-sm mb-3 p-6">
        <div className="flex items-center justify-center">
          {thumbnail ? (
            <>
              <img
                src={thumbnail}
                alt="Thumbnail"
                className="max-w-[150px] max-h-[150px] mr-3"
              />
              <MediaImageList opacity={"40%"} />
            </>
          ) : (
            <h3 className="text-md">Brak zdjęć</h3>
          )}
        </div>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={images} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-y-2 mb-3">
            {images.map((image) => (
              <SortableImage
                key={image.id}
                id={image.id}
                url={image.url}
                name={image.name}
                removeImage={removeImage}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <ActionIcon
        icon={<Upload />}
        className={styles["upload-icon"]}
        label="Dodaj obraz"
        border="border-medium"
        isInput={true}
        multiple={true}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default ImageContainer;
