import { Navigate } from "react-router-dom";

const AuthenticationProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    if (role === "admin") {
      alert('Redirect to Admin');
      return <Navigate to="/" replace />;
    }

    if (role === "member") {
      return <Navigate to="/member/dashboard" replace />;
    }

    // fallback
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthenticationProtectedRoute;