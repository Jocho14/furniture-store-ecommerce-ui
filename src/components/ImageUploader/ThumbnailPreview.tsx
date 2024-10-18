import React from "react";

import { MediaImageList } from "iconoir-react";

interface ThumbnailPreviewProps {
  thumbnail: string | null;
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({ thumbnail }) => {
  return (
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
  );
};

export default ThumbnailPreview;
