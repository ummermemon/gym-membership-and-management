import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.tsx";
import LandingPage from "./pages/frontend/LandingPage.tsx";
import DashboardPage from "./pages/member/DasboardPage.tsx";
import PublicRoute from "./routes/PublicRoute.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import EditProfilePage from "./pages/member/profile/EditProfilePage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/member/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/member/edit-profile" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;