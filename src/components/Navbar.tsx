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
import { LogIn, LogOut, Menu, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import LogoLink from "./LogoLink";

export default function Navbar() {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;

  return (
    <nav className="border-b bg-primary-foreground">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-row items-center justify-between">
          <LogoLink />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <AccountMenu />
            ) : (
              <Button variant="default" asChild>
                <Link to="/login">
                  <LogIn className="w-4 h-4" />
                  Log In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Menu className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            {/* todo: change to actual user profile */}
            <Link to="/profile/example/view" className="w-full cursor-pointer">
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              to="/logout"
              className="text-destructive w-full cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
