import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function MemberRouteGuard() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return <Outlet />;
}
