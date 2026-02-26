import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../../features/auth/auth.store";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItem = (path, label) => (
    <button onClick={() => navigate(path)}>{label}</button>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-900 text-white flex flex-col justify-between">
        <div>
          <div className="p-4 text-xl font-bold border-b border-gray-700">
            Order System{" "}
          </div>
          <div className="p-4 flex flex-col space-y-2">
            {navItem("/", "Dashboard")}
            {navItem("/products", "Products")}
            {navItem("/products/create", "Create Product")}
            {navItem("/orders", "Orders")}
          </div>
        </div>
        {/* Bottom section */}
        <div className="p-4 border-t border-gray-700">
          <p className="text-sm mb-2 text-gray-400">
            Logged In as- {user?.name}
          </p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
