import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LoginPage from "./pages/auth/login";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import MemberDashboardPage from "./pages/member/dashboard";
import MemberProtectedRoute from "./MemberProtectedRoute";
import AuthenticationProtectedRoute from "./AuthenticationProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminDashboardPage from "./pages/admin/dashboard";
import UsersList from "./pages/admin/users/usersList";
import MembershipPlanList from "./pages/admin/membership-plans/membershipPlanList";
import WorkoutPlanList from "./pages/admin/workout-plans/workoutPlanList";
import ViewUser from "./pages/admin/users/viewUser";
import UpdateWorkoutPlan from "./pages/admin/workout-plans/updateWorkoutPlan";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<AuthenticationProtectedRoute><LoginPage /></AuthenticationProtectedRoute>} path="/login" />
      <Route element={<ForgotPasswordPage />} path="/forgot-password" />
      <Route element={<MemberProtectedRoute><MemberDashboardPage /></MemberProtectedRoute>} path="/member/dashboard" />
      <Route element={<AdminProtectedRoute><AdminDashboardPage /></AdminProtectedRoute>} path="/admin/dashboard" />
      <Route element={<AdminProtectedRoute><UsersList /></AdminProtectedRoute>} path="/admin/users" />
      <Route element={<AdminProtectedRoute><ViewUser /></AdminProtectedRoute>} path="/admin/users/view/:id" />
      <Route element={<AdminProtectedRoute><MembershipPlanList /></AdminProtectedRoute>} path="/admin/membership-plans" />
      <Route element={<AdminProtectedRoute><WorkoutPlanList /></AdminProtectedRoute>} path="/admin/workout-plans" />
      <Route element={<AdminProtectedRoute><UpdateWorkoutPlan /></AdminProtectedRoute>} path="/admin/workout-plans/update/:id" />
    </Routes>
  );
}

export default App;
