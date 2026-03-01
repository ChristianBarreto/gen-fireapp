import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainTemplate from "./components/pages/MainTemplate";
import MainPage from "./components/pages/MainPage";
import AdminDashboard from "./admin_app/AdminDashboard";
import AdminTemplate from "./admin_app/AdminTemplate";
import ListPage from "./admin_app/ListPage";
import AddEditPage from "./admin_app/AddEditPage";
import schema from "./schema.json";

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
  {
    path: "/admin",
    element: <AdminTemplate />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      ...schema.flatMap(resource => [
        {
          path: `/admin/${resource.url}`,
          element: <ListPage />,
        },
        {
          path: `/admin/${resource.url}/add/`,
          element: <AddEditPage />,
        },
        {
          path: `/admin/${resource.url}/:id`,
          element: <AddEditPage />,
        }
      ])
    ]
  }
]

export const routes = createBrowserRouter(rawRoutes);