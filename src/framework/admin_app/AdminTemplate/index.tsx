import { Outlet } from "react-router-dom";
import AdminTemplateDrawer from "./TemplateDrawer";

export default function AdminTemplate() {
  return (
    <AdminTemplateDrawer>
      <Outlet/>
    </AdminTemplateDrawer>
  );
}