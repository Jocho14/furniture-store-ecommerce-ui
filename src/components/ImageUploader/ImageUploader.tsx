import React, { useState } from "react";

import {
  DndContext,
  closestCenter,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableImage from "./SortableImage";
import ThumbnailPreview from "./ThumbnailPreview";
import ImageUploadButton from "./ImageUploadButton";

import { MediaImageList } from "iconoir-react";

const ImageUploader = () => {
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
      <ThumbnailPreview thumbnail={thumbnail} />

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={images} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-y-2 mb-3">
            {images.map((image, index) => (
              <div className="flex items-center gap-x-6" key={image.id}>
                <SortableImage
                  id={image.id}
                  url={image.url}
                  name={image.name}
                  removeImage={removeImage}
                />
                {index === 0 && <MediaImageList opacity="40%" />}
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <ImageUploadButton onUpload={handleFileUpload} />
    </div>
  );
};

export default ImageUploader;
