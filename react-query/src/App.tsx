import {
  createBrowserRouter,
  RouterProvider,
  type DataRouter,
  type RouteObject,
  Navigate,
} from "react-router-dom";
import Events from "./components/Events/Events.tsx";
import EventsRootLayout from "./UI/EventsRoot.tsx";
import EventDetails from "./components/Events/EventDetails.tsx";
import NewEvent from "./components/Events/NewEvent.tsx";
import EditEvent from "./components/Events/EditEvent.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http.ts";

import "./App.css";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate replace to="/events" />,
  },
  {
    path: "/events",
    element: <EventsRootLayout />,
    children: [
      {
        index: true,
        element: <Events />,
      },
      {
        path: ":id",
        children: [
          {
            index: true,
            element: <EventDetails />,
          },
          {
            path: "edit",
            element: <EditEvent />,
          },
        ],
      },
      {
        path: "new",
        element: <NewEvent />,
      },
    ],
  },
];
const router: DataRouter = createBrowserRouter(routes);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
