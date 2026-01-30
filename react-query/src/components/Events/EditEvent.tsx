import React, { type JSX } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import Modal from "../../UI/Modal.tsx";
import EventForm from "./EventForm.tsx";
import LoadingIndicator from "../../UI/LoadingIndicator.tsx";
import ErrorBlock from "../../UI/ErrorBlock.tsx";
import type {
  Event,
  EventKey,
  EventRequest,
  EventUpdateRequest,
  MutationContext,
} from "../../utils/data-types.ts";
import { fetchEvent, updateEvent, queryClient } from "../../utils/http.ts";
import type ApiError from "../../utils/ApiError.ts";

const EditEvent: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const { id } = useParams<string>();
  const { data, isPending, isError, error } = useQuery<
    Event,
    ApiError,
    Event,
    EventKey
  >({
    queryKey: ["events", { id }],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });

  const { mutate } = useMutation<
    EventRequest,
    ApiError,
    EventUpdateRequest,
    MutationContext
  >({
    mutationFn: updateEvent,
    onMutate: async (data): Promise<MutationContext> => {
      const newEvent: Event = data.event;
      await queryClient.cancelQueries<EventKey>({
        queryKey: ["events", { id }],
      });
      const previousEvent: Event = queryClient.getQueryData<Event, EventKey>([
        "events",
        { id },
      ])!;
      queryClient.setQueryData<Event, EventKey>(["events", { id }], newEvent);
      return { previousEvent };
    },
    onError: (_error, _data, context) => {
      queryClient.setQueryData<Event, EventKey>(
        ["events", { id }],
        context?.previousEvent,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries<EventKey>({
        queryKey: ["events", { id }],
      });
    },
  });

  const handleSubmit = (event: Event): void => {
    mutate({ id, event });
    navigate("../");
  };

  let content: JSX.Element = <></>;
  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }
  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event, Please check your input and try again later. "
          }
        />
        <div className="form-actions">
          <Link to="/events" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm onSubmit={handleSubmit} inputData={data}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal>{content}</Modal>;
};

export default EditEvent;
