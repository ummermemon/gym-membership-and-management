import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login/Page.tsx";
import LandingPage from "./pages/frontend/Landing/Page.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;