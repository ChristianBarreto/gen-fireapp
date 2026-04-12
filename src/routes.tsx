import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainTemplate from "./components/pages/MainTemplate";
import MainPage from "./components/pages/MainPage";
import { adminRoutes } from "./framework/adminRoutes";

export const rawRoutes = [
  {
    path: '/',
    element: <MainTemplate />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ]
  },
  adminRoutes
]

export const routes = createBrowserRouter(rawRoutes);