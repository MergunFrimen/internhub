import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppleIcon } from "@/components/icons/AppleIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { MetaIcon } from "@/components/icons/MetaIcon";
import { Link } from "react-router-dom";

export function Register() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="w-full">
                  <AppleIcon />
                  <span className="sr-only">Login with Apple</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <GoogleIcon />
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <MetaIcon />
                  <span className="sr-only">Login with Meta</span>
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/login-decoration.svg"
              alt="Decorative background"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <Link to="/wip">Terms of Service</Link> and{" "}
        <Link to="/wip">Privacy Policy</Link>.
      </div>
    </div>
  );
}
