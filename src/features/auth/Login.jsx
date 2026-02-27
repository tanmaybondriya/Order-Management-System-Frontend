import { loginUser } from "./auth.api";
import useAuthStore from "./auth.store";
import { notifyError, notifySuccess } from "../../utils/notify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

const Login = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      const token = res.data.token;
      await setAuth({ user: null, token });
      notifySuccess("login succesful");
      navigate("/");
    } catch (error) {
      notifyError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray">
      <div className="bg-gray-700 text-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-bold">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full p-2 mt-1 mb-1 rounded bg-gray-500 border border-red-gray-300 focus:outline-none focus:border-blue-500"
            {...register("email")}
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <h2 className="text-bold">Password</h2>
          <input
            className="w-full p-2 mt-1 mb-1 rounded bg-gray-500 border border-red-gray-300 focus:outline-none focus:border-blue-500"
            {...register("password")}
            type="password"
            placeholder="Password(Must be 6 characters)"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 p-2 mt-2 w-full rounded font-semibold self-center transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
