import React, { type JSX } from "react";
import { Link, useNavigate } from "react-router-dom";

import Modal from "../../UI/Modal.tsx";
import EventForm from "./EventForm.tsx";
import type { Event } from "../../utils/data-types.ts";

const EditEvent: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const handleSubmit = (event: Event): void => {
    console.log(event);
  };
  const handleClose = () => navigate("../");

  return (
    <Modal onClose={handleClose}>
      <EventForm onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    </Modal>
  );
};

export default EditEvent;
