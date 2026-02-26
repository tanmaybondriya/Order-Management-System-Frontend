import { create } from "zustand";

import {
  createOrderApi,
  fetchOrderHistoryApi,
  cancelOrderApi,
  deleteOrderApi,
} from "./order.api";
import { notifyError, notifySuccess } from "../../utils/notify";
import useProductStore from "../products/product.store";

const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  cancellingIds: [],
  fetchOrders: async () => {
    set({ loading: true });

    try {
      const res = await fetchOrderHistoryApi();
      set({ orders: res.data });
    } finally {
      set({ loading: false });
    }
  },

  createOrders: async (orderData) => {
    const res = await createOrderApi(orderData);
    set((state) => ({
      orders: [...state.orders, res.data],
    }));
    return res;
  },

  cancelOrder: async (order) => {
    const productStore = useProductStore.getState();

    set((state) => ({
      cancellingIds: [...state.cancellingIds, order._id],
    }));

    await cancelOrderApi(order._id);
    try {
      set((state) => ({
        orders: state.orders.map((orderItem) =>
          orderItem._id === order._id
            ? { ...orderItem, status: "CANCELLED" }
            : orderItem,
        ),
      }));
      productStore.increaseStock(order.product._id, order.quantity);
    } finally {
      set((state) => ({
        cancellingIds: state.cancellingIds.filter((id) => id !== order._id),
      }));
    }
  },

  deleteOrders: async () => {
    try {
      await deleteOrderApi();
      set((state) => ({
        orders: state.orders.filter((o) => o.status !== "CANCELLED"),
      }));
      notifySuccess("Orders deleted successfully");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      notifyError("could not delete orders from server");
    }
  },
}));

export default useOrderStore;
