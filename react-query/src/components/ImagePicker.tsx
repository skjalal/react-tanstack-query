import React, { type JSX } from "react";
import type { ImagePickerProps } from "../utils/data-types";

const ImagePicker: React.FC<ImagePickerProps> = ({
  images,
  selectedImage,
  onSelect,
}): JSX.Element => {
  return (
    <div id="image-picker">
      <p>Select an image</p>
      <ul>
        {images.map((image) => (
          <li
            key={image.path}
            onClick={() => onSelect(image.path)}
            className={selectedImage === image.path ? "selected" : undefined}
          >
            <img
              src={`http://localhost:3000/${image.path}`}
              alt={image.caption}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImagePicker;
