import React, { type JSX } from "react";
import { Link } from "react-router-dom";

import EventForm from "./EventForm.tsx";
import type { Event } from "../../utils/data-types.js";
import Modal from "../../UI/Modal.tsx";

const NewEvent: React.FC = (): JSX.Element => {
  const handleSubmit = (event: Event): void => {
    console.log(event);
  };
  return (
    <Modal>
      <EventForm onSubmit={handleSubmit}>
        <>
          <Link to="/events" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
      </EventForm>
    </Modal>
  );
};

export default NewEvent;
