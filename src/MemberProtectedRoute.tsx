import { Navigate } from "react-router-dom";

const MemberProtectedRoute = ({ children }) => {
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");
  if (role === "member") {
    return children;
  }

  if (role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default MemberProtectedRoute;