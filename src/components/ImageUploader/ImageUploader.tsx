import React, { useState, useEffect } from "react";

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

interface ImageUploaderProps {
  onImagesChange: (imageFiles: File[]) => void;
  initialImages?: File[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesChange,
  initialImages = [],
}) => {
  const [images, setImages] = useState<
    Array<{ id: string; url: string; name: string; file: File }>
  >([]);

  useEffect(() => {
    if (initialImages.length > 0) {
      const processedImages = initialImages.map((file) => ({
        id: URL.createObjectURL(file),
        url: URL.createObjectURL(file),
        name: file.name,
        file,
      }));
      setImages(processedImages);
    }
  }, [initialImages]);

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
      file,
    }));

    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...newImages];
      onImagesChange(updatedImages.map((image) => image.file));
      return updatedImages;
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((prevImages) => {
        const oldIndex = prevImages.findIndex((item) => item.id === active.id);
        const newIndex = prevImages.findIndex((item) => item.id === over.id);
        const updatedImages = arrayMove(prevImages, oldIndex, newIndex);

        onImagesChange(updatedImages.map((image) => image.file));
        return updatedImages;
      });
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const updatedImages = prev.filter((image) => image.id !== id);
      onImagesChange(updatedImages.map((image) => image.file));
      return updatedImages;
    });
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
