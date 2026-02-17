import axios from "../../api/axios";

export const fetchProductApi = async () => {
  const response = await axios.get("/products");
  // console.log("got the data getAPI", response);

  return response.data;
};

export const createProductApi = async (data) => {
  const response = await axios.post("/products", data);
  // console.log("got the data POST API", response);
  return response.data;
};
