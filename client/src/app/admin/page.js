import PrivateRoute from "@/components/Auth/PrivateRoute.jsx";
import AdminDashboard from "@/components/Auth/AdminDashboard.jsx";

export default function Page() {
  return (
    <PrivateRoute>
      <AdminDashboard />
    </PrivateRoute>
  );
}
