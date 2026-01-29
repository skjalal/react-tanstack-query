import React, { type JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import EventForm from "./EventForm.tsx";
import type { Event, EventRequest } from "../../utils/data-types.js";
import Modal from "../../UI/Modal.tsx";
import type ApiError from "../../utils/ApiError.ts";
import { createNewEvent, queryClient } from "../../utils/http.ts";
import ErrorBlock from "../../UI/ErrorBlock.tsx";

const NewEvent: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation<
    Event,
    ApiError,
    EventRequest
  >({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      navigate("/events");
    },
  });
  const handleSubmit = (event: Event): void => {
    mutate({ event });
  };
  return (
    <Modal>
      <EventForm onSubmit={handleSubmit}>
        {isPending && "Submitting..."}
        {!isPending && (
          <>
            <Link to="/events" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            "Failed to create event. Please check your input and try again later."
          }
        />
      )}
    </Modal>
  );
};

export default NewEvent;
