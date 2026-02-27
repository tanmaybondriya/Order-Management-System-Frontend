import useAuthStore from "../auth/auth.store";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2 className="text-2xl fond-bold b-4">Welcome {user?.name}</h2>
      <p className="text-gray-600">This is your dashboard overview</p>
    </div>
  );
};

export default Dashboard;
