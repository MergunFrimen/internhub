import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthLayout } from "./layouts/AuthLayout";
import { MainLayout } from "./layouts/MainLayout";

import { ReactNode } from "react";
import Applications from "./pages/Applications";
import CompanyDirectory from "./pages/CompanyDirectory";
import CompanyProfile from "./pages/CompanyProfile";
import Home from "./pages/Home";
import InternshipDetails from "./pages/InternshipDetails";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Search from "./pages/Search";
import UserProfile from "./pages/UserProfile";
import PublicProfile from "./pages/PublicProfile";
import CompanyProfileManagement from "./pages/CompanyProfileManagement";
import NotificationsPage from "./pages/NotificationsPage";

const ProtectedRoute = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  // const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

export function App() {
  return (
    // <AuthProvider>
    <Router basename="/internhub">
      <Routes>
        {/* Public Routes with Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/internships/:id" element={<InternshipDetails />} />
          <Route path="/companies" element={<CompanyDirectory />} />
          <Route path="/companies/:id" element={<CompanyProfile />} />
          <Route path="/profile/:id/view" element={<PublicProfile />} />
        </Route>

        {/* Protected Routes with Main Layout */}
        <Route element={<MainLayout />}>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/profile/manage"
            element={
              <ProtectedRoute>
                <CompanyProfileManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Auth Routes with Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />

        {/* Examples */}
        <Route path="/profile/example/view" element={<PublicProfile />} />
      </Routes>
    </Router>
    // </AuthProvider>
  );
}
