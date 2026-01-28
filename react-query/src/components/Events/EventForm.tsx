import React, {
  type FormEvent,
  type JSX,
  type PropsWithChildren,
  useState,
} from "react";
import ImagePicker from "../ImagePicker.jsx";
import type { EventFormProps } from "../../utils/data-types";

const EventForm: React.FC<PropsWithChildren<EventFormProps>> = ({
  inputData,
  onSubmit,
  children,
}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState<string>(
    inputData?.image || "",
  );

  const handleSelectImage = (image: string): void => {
    setSelectedImage(image);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const title = data["title"] as string;
    const description = data["description"] as string;
    const date = data["date"] as string;
    const time = data["time"] as string;
    const location = data["location"] as string;

    onSubmit({
      title,
      description,
      date,
      time,
      location,
      image: selectedImage,
    });
  };

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ""}
        />
      </p>

      <div className="control">
        <ImagePicker
          images={[]}
          onSelect={handleSelectImage}
          selectedImage={selectedImage}
        />
      </div>

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ""}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ""}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? ""}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? ""}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
};

export default EventForm;
