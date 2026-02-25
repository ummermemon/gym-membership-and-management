import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");
  if (role === "admin") {
    return children;
  }

  if (role === "member") {
    return <Navigate to="/member/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default AdminProtectedRoute;