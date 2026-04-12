import React from "react";
import AdminDashboard from "./admin_app/AdminDashboard";
import AdminTemplate from "./admin_app/AdminTemplate";
import ListPage from "./admin_app/ListPage";
import AddEditPage from "./admin_app/AddEditPage";
import schema from "../schema.json";

export const adminRoutes = {
  path: "/admin",
  element: <AdminTemplate />,
  children: [
    {
      index: true,
      element: <AdminDashboard />,
    },
    ...schema.flatMap((resource: any) => [
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
};
