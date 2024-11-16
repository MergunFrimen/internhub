import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Menu,
  MessageSquare,
  Search,
  Settings,
  UserCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const isAuthenticated = true;

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">InternHub</span>
          </Link>

          {/* Main Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
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

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <ProfileBurgerMenu />
            ) : (
              <div>
                <Button variant="ghost" asChild>
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function ProfileBurgerMenu({}: {}) {
  const unreadCount = 3;
  const unreadMessages = 2;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Menu className="w-5 h-5" />
          {(unreadCount > 0 || unreadMessages > 0) && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center"
              variant="destructive"
            >
              {unreadCount + unreadMessages}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="w-full cursor-pointer">
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/applications" className="w-full cursor-pointer">
              <Briefcase className="mr-2 h-4 w-4" />
              Applications
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/messages" className="w-full cursor-pointer">
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
                {unreadMessages > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {unreadMessages}
                  </Badge>
                )}
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/notifications" className="w-full cursor-pointer">
              <div className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="w-full cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
