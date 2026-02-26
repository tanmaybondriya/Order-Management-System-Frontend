import { useState } from "react";
import { loginUser } from "./auth.api";
import useAuthStore from "./auth.store";
import { notifyError, notifySuccess } from "../../utils/notify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth, setLoading } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await loginUser(formData);
      const token = res.data.token;
      await setAuth({ user: null, token });

      notifySuccess("login succesful");

      navigate("/");
    } catch (error) {
      notifyError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="bg-gray-800 text-white flex flex-col justify-between">
        <h2 className="text-bold">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/register");
            }}
          >
            Create new user
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
