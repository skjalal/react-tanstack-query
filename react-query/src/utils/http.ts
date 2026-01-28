import ApiError from "./ApiError";
import type { Data, Event } from "./data-types";

export async function fetchEvents(): Promise<Event[]> {
  const response = await fetch("http://localhost:3000/events");

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
