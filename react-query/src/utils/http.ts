import { QueryClient } from "@tanstack/react-query";
import ApiError from "./ApiError";
import type {
  Data,
  Event,
  SearchType,
  EventRequest,
  ImageData,
  Image,
  DeleteRequest,
  DeleteResponse,
  EventUpdateRequest,
} from "./data-types";

export const queryClient = new QueryClient();

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

export async function fetchSelectableImages(
  search: SearchType,
): Promise<Image[]> {
  const { signal } = search;
  const response = await fetch(`http://localhost:3000/events/images`, {
    signal,
  });

  if (!response.ok) {
    throw new ApiError(
      "An error occurred while fetching the images",
      response.status,
      await response.json(),
    );
  }

  const { images }: ImageData = await response.json();

  return images;
}

export async function fetchEvent({ id, signal }: SearchType): Promise<Event> {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
  });

  if (!response.ok) {
    throw new ApiError(
      "An error occurred while fetching the event",
      response.status,
      await response.json(),
    );
  }

  const { event }: EventRequest = await response.json();

  return event;
}

export async function deleteEvent({
  id,
}: DeleteRequest): Promise<DeleteResponse> {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new ApiError(
      "An error occurred while deleting the event",
      response.status,
      await response.json(),
    );
  }

  return response.json();
}

export async function updateEvent({
  id,
  event,
}: EventUpdateRequest): Promise<EventRequest> {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "PUT",
    body: JSON.stringify({ event }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new ApiError(
      "An error occurred while updating the event",
      response.status,
      await response.json(),
    );
  }

  return response.json();
}
