"use client";

import { AuthProvider } from "@/context/AuthContext.jsx";
import { Toaster } from "@/components/ui/sonner.jsx";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <Toaster theme="dark" richColors position="top-center" />
      {children}
    </AuthProvider>
  );
}
