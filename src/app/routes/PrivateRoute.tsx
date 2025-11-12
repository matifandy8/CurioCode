import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/useAuth";

interface Props {
  allowedRoles: ("user" | "admin")[];
}
export function PrivateRoute({ allowedRoles }: Props) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role!)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
