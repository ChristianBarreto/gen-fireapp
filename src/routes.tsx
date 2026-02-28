import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainTemplate from "./components/pages/MainTemplate";
import MainPage from "./components/pages/MainPage";
import AdminDashboard from "./admin_app/AdminDashboard";
import AdminTemplate from "./admin_app/AdminTemplate";
import ListPage from "./admin_app/ListPage";
import AddEditPage from "./admin_app/AddEditPage";

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
      {
        path: "/admin/parts",
        element: <ListPage />,
      },
      {
        path: "/admin/parts/add/",
        element: <AddEditPage />,
      },
      {
        path: "/admin/parts/:id",
        element: <AddEditPage />,
      },
      {
        path: "/admin/departments",
        element: <ListPage />,
      },
      {
        path: "/admin/departments/add/",
        element: <AddEditPage />,
      },
      {
        path: "/admin/departments/:id",
        element: <AddEditPage />,
      },
    ]
  }
]

export const routes = createBrowserRouter(rawRoutes);