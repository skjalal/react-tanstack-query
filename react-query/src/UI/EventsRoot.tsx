import React, { type JSX } from "react";
import { Outlet } from "react-router-dom";

const EventsRootLayout: React.FC = (): JSX.Element => {
  return <Outlet />;
};

export default EventsRootLayout;
