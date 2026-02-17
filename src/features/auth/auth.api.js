import axios from "../../api/axios";

export const loginUser = async (credentials) => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await axios.post("/auth/register", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get("/auth/me");
  return response.data;
};
