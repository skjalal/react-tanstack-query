type Image = {
  path: string;
  caption: string;
};

type ImagePickerProps = {
  images: Image[];
  selectedImage: string;
  onSelect: (path: string) => void;
};

type ErrorBlockProps = {
  title: string;
  message: string;
};

type ModalProps = {
  onClose?: () => void;
};

type Event = {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
};

type Data = {
  events: Event[];
};

type EventFormProps = {
  inputData?: Event;
  onSubmit: (event: Event) => void;
};

type EventItemProps = {
  event: Event;
};

type EventRequest = {
  event: Event;
};

type DeleteRequest = {
  id?: string;
};

type DeleteResponse = {
  message: string;
};

type SearchType = { searchTerm?: string; signal: AbortSignal; id?: string };
type ImageData = {
  images: Image[];
};

type EventUpdateRequest = {
  id?: string;
  event: Event;
};

type MutationContext = {
  previousEvent: Event;
};

export type {
  Image,
  ImagePickerProps,
  ErrorBlockProps,
  ModalProps,
  Event,
  EventFormProps,
  EventItemProps,
  Data,
  SearchType,
  EventRequest,
  ImageData,
  DeleteRequest,
  DeleteResponse,
  EventUpdateRequest,
  MutationContext,
};
