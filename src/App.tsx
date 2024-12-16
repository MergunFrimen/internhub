import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import ScrollToTop from "./components/ScrollToTop";

import InternshipDetails from "./pages/InternshipDetails";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/Search";
import UserProfile from "./pages/UserProfile";
import Logout from "./pages/Auth/Logout";
import WorkInProgress from "./pages/WorkInProgress";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import ChatPage from "./pages/ChatPage";

export function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/internships" element={<SearchPage />} />
          <Route path="/internships/:id" element={<InternshipDetails />} />
          <Route path="/profiles/:id" element={<UserProfile />} />
          <Route path="/profile/example/view" element={<UserProfile />} />
        </Route>

        <Route path="/chat" element={<ChatPage />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        <Route path="/wip" element={<WorkInProgress />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
