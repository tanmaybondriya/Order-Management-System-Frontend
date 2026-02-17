import { create } from "zustand";

import {
  createOrderApi,
  fetchOrderHistoryApi,
  cancelOrderApi,
  deleteOrderApi,
} from "./order.api";
import { notifyError, notifySuccess } from "../../utils/notify";

const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
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

  cancelOrder: async (orderId) => {
    // const productStore = useProductStore.getState();
    await cancelOrderApi(orderId);
    // const increasedstock = productStore.increaseStock(productId, quantity); //

    set((state) => ({
      orders: state.orders.map((orders) =>
        orders._id === orderId ? { ...orders, status: "CANCELLED" } : orders,
      ),
    }));
    // set ((state)=>({
    //   orders:state.orders.map(orders)=>
    //     orders._id===orderId?{...orders,quantity:}
    // }))
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
