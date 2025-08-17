import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredUserType?: 'tourist' | 'organizer';
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  requiredUserType,
  redirectTo = "/signin" 
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to={redirectTo} replace />;
  }

  // If specific user type is required but user doesn't match
  if (requiredUserType && user?.userType !== requiredUserType) {
    // Redirect organizers to dashboard, tourists to trips
    const defaultRedirect = user?.userType === 'organizer' ? '/dashboard' : '/trips';
    return <Navigate to={defaultRedirect} replace />;
  }

  return <>{children}</>;
};