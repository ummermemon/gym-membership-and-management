import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.tsx";
import LandingPage from "./pages/frontend/LandingPage.tsx";
import DashboardPage from "./pages/member/DasboardPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/member/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;