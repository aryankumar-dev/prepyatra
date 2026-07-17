import PrivateRoute from "@/components/Auth/PrivateRoute.jsx";
import Dashboard from "@/components/Auth/Dashboard.jsx";

export default function Page() {
  return (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  );
}
