import { Outlet } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
