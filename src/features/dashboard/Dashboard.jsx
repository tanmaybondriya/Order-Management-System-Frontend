import { useNavigate } from "react-router-dom";
import useAuthStore from "../auth/auth.store";

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Welcome {user?.name}</h3>
      <button onClick={() => navigate("/products")}>Products</button>

      <button onClick={() => navigate("/products/create")}>
        Create Products
      </button>

      <button onClick={() => navigate("/orders")}>Orders</button>

      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
