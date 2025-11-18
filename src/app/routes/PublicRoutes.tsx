import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../providers/useAuth";


export default function PublicRoutes() {
  const { user } = useAuth();

  console.log("PublicRoutes rendered");

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
