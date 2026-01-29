import ApiError from "./ApiError";
import type { Data, Event, SearchType, EventRequest } from "./data-types";

export async function fetchEvents(search: SearchType): Promise<Event[]> {
  const { searchTerm, signal } = search;
  let url = "http://localhost:3000/events";
  if (searchTerm && searchTerm !== "") {
    url += "?search=" + searchTerm;
  }
  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    throw new ApiError(
      "An error occurred while fetching the events",
      response.status,
      await response.json(),
    );
  }

  const { events }: Data = await response.json();

  return events;
}

export async function createNewEvent(eventData: EventRequest): Promise<Event> {
  const response = await fetch(`http://localhost:3000/events`, {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new ApiError(
      "An error occurred while creating the event",
      response.status,
      await response.json(),
    );
  }

  const { event } = await response.json();

  return event;
}
