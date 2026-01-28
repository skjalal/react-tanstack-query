import ApiError from "./ApiError";
import type { Data, Event, SearchType } from "./data-types";

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
