import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./auth.api";
import { notifySuccess, notifyError } from "../../utils/notify";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await registerUser(formData);
      notifySuccess("Registration successful. Please Login");
      navigate("/login");
    } catch (error) {
      notifyError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Already a User
        </button>
      </form>
    </div>
  );
};

export default Register;
