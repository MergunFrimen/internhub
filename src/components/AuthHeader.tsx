import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

export default function AuthHeader() {
  const location = useLocation();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-xl font-bold">InternHub</div>
          </Link>

          {/* Auth Navigation */}
          <div className="flex items-center space-x-4">
            <Button
              variant={location.pathname === "/login" ? "default" : "outline"}
              asChild
            >
              <Link to="/login" className="flex items-center space-x-2">
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            </Button>
            <Button
              variant={
                location.pathname === "/register" ? "default" : "outline"
              }
              asChild
            >
              <Link to="/register" className="flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Page Title and Description */}
        <div className="mt-8 mb-6 text-center">
          {location.pathname === "/login" ? (
            <>
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-600">
                Sign in to access your internship applications and messages
              </p>
            </>
          ) : location.pathname === "/register" ? (
            <>
              <h1 className="text-2xl font-bold mb-2">Create an Account</h1>
              <p className="text-gray-600">
                Join InternHub to discover exciting internship opportunities
              </p>
            </>
          ) : null}
        </div>

        {/* Additional Navigation or Help Links */}
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <Link to="/help" className="hover:text-gray-900">
            Help Center
          </Link>
          <Link to="/contact" className="hover:text-gray-900">
            Contact Support
          </Link>
          <Link to="/privacy" className="hover:text-gray-900">
            Privacy Policy
          </Link>
        </div>
      </div>
    </header>
  );
}
