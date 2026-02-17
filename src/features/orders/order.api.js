import axios from "../../api/axios";

export const createOrderApi = async (orderData) => {
  const response = await axios.post("/orders/create-order", orderData);
  return response.data;
};

export const fetchOrderHistoryApi = async () => {
  const response = await axios.get("/orders/order-history");
  return response.data;
};

export const cancelOrderApi = async (orderId) => {
  const response = await axios.patch(`/orders/cancel-order/${orderId}`);
  return response.data;
};

export const deleteOrderApi = async () => {
  const response = await axios.delete("/orders/delete-order");
  return response.data;
};
