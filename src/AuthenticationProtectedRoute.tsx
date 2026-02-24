import { Navigate } from "react-router-dom";
import { addToast } from "@heroui/toast";
const AuthenticationProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");

  if (token) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (role === "member") {
      return <Navigate to="/member/dashboard" replace />;
    } else {

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      addToast({
        title: "Error",
        description: "Something went wrong",
        variant: "flat",
        color: "danger",
      });
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default AuthenticationProtectedRoute;