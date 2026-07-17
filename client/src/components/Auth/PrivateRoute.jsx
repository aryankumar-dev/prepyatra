"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext.jsx';
import { Skeleton } from "@/components/ui/skeleton.jsx";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-48" />
      </div>
    );
  }
  return children;
};

export default PrivateRoute;