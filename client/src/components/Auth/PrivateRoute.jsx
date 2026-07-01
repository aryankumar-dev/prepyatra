import { Navigate } from 'react-router-dom';
import { useAuth } from '#context/AuthContext.jsx';
import { Skeleton } from "@/components/ui/skeleton.jsx";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-48" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;
