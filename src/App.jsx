import { useEffect } from "react";
import useAuthStore from "./features/auth/auth.store";
import AppRoutes from "./app/router";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, []);

  return <AppRoutes />;
}

export default App;
