import React, { type FormEvent, type JSX, useRef, useState } from "react";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import ErrorBlock from "../../UI/ErrorBlock.tsx";
import LoadingIndicator from "../../UI/LoadingIndicator.tsx";
import EventItem from "./EventItem.tsx";
import type { Event } from "../../utils/data-types.ts";
import { fetchEvents } from "../../utils/http.ts";
import type ApiError from "../../utils/ApiError.ts";

const FindEventSection: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchElement = useRef<HTMLInputElement>(null);
  const { data, isLoading, isError, error }: UseQueryResult<Event[], ApiError> =
    useQuery<Event[], ApiError>({
      queryKey: ["events", { search: searchTerm }],
      queryFn: ({ signal }) => fetchEvents({ searchTerm, signal }),
      enabled: searchTerm !== "",
      // staleTime: 5000,
      // gcTime: 30000,
    });
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSearchTerm(searchElement.current?.value || "");
  };
  let content: JSX.Element = (
    <p>Please enter a search term and to find events</p>
  );
  if (isLoading) {
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
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
};

export default FindEventSection;
