import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Bell,
  Briefcase,
  Building2,
  LogIn,
  LogOut,
  MessageSquare,
  Search,
  UserCircle,
} from "lucide-react";

export default function Navbar() {
  const isAuthenticated = true;
  const unreadCount = 3;

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/internhub/favicon.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">InternHub</span>
          </Link>

          {/* Main Navigation */}
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex">
              <NavigationMenuItem>
                <Link to="/search">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Search className="w-4 h-4 mr-2" />
                    Find Internships
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/companies">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Building2 className="w-4 h-4 mr-2" />
                    Companies
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Section */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/notifications" className="relative">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                </Button>

                {/* Messages */}
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/messages">
                    <MessageSquare className="w-5 h-5" />
                  </Link>
                </Button>

                {/* Applications */}
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/applications">
                    <Briefcase className="w-5 h-5" />
                  </Link>
                </Button>

                {/* Profile */}
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/profile">
                    <UserCircle className="w-5 h-5" />
                  </Link>
                </Button>

                {/* Logout */}
                <Button variant="ghost" size="icon">
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
