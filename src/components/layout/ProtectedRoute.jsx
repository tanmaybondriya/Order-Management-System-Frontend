import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../features/auth/auth.store";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading)
    return (
      <div className="flex item-center justify-center h-screen">
        <p text-gray-600>Loading...</p>
      </div>
    );
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
