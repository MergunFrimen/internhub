import { ReactNode } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  // const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
}
