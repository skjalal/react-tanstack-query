import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
  type DataRouter,
  type RouteObject,
} from "react-router-dom";
import Events from "./components/Events/Events.tsx";
import EventDetails from "./components/Events/EventDetails.tsx";
import NewEvent from "./components/Events/NewEvent.tsx";
import EditEvent from "./components/Events/EditEvent.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./App.css";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/events" />,
  },
  {
    path: "/events",
    element: <Events />,

    children: [
      {
        path: "/events/new",
        element: <NewEvent />,
      },
    ],
  },
  {
    path: "/events/:id",
    element: <EventDetails />,
    children: [
      {
        path: "/events/:id/edit",
        element: <EditEvent />,
      },
    ],
  },
];
const router: DataRouter = createBrowserRouter(routes);
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
