import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LoginPage from "./pages/auth/login";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import MemberDashboardPage from "./pages/member/dashboard";
import MemberProtectedRoute from "./MemberProtectedRoute";
import AuthenticationProtectedRoute from "./AuthenticationProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<AuthenticationProtectedRoute><LoginPage /></AuthenticationProtectedRoute>} path="/login" />
      <Route element={<ForgotPasswordPage />} path="/forgot-password" />
      <Route element={<MemberProtectedRoute><MemberDashboardPage /></MemberProtectedRoute>} path="/member/dashboard" />
    </Routes>
  );
}

export default App;
