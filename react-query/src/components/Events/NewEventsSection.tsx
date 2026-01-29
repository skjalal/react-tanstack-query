import React, { type JSX } from "react";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import LoadingIndicator from "../../UI/LoadingIndicator.tsx";
import ErrorBlock from "../../UI/ErrorBlock.tsx";
import EventItem from "./EventItem.tsx";
import { fetchEvents } from "../../utils/http.ts";
import type { Event, EventKey } from "../../utils/data-types.ts";
import type ApiError from "../../utils/ApiError.ts";

const NewEventsSection: React.FC = (): JSX.Element => {
  const { data, isPending, isError, error }: UseQueryResult<Event[], ApiError> =
    useQuery<Event[], ApiError, Event[], EventKey>({
      queryKey: ["events", { max: 3 }],
      queryFn: ({ signal, queryKey }) => {
        return fetchEvents({ signal, ...queryKey[1] });
      },
      // staleTime: 5000,
      // gcTime: 30000,
    });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events."}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
};

export default NewEventsSection;
