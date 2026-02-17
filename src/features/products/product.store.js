import { create } from "zustand";
import { fetchProductApi, createProductApi } from "./product.api";

const useProductStore = create((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });

    try {
      const res = await fetchProductApi();
      set({
        products: res.data,
        loading: false,
      });
    } catch (error) {
      console.error("fetch failed", error);
      set({ loading: false });
    }
  },

  createProduct: async (productData) => {
    const res = await createProductApi(productData);

    // Append new product without refetching
    set((state) => ({
      products: [...state.products, res.data],
    }));

    return res;
  },

  decreaseStock: async (productId, quantity) => {
    set((state) => ({
      products: state.products.map((product) =>
        product._id === productId
          ? { ...product, stock: product.stock - quantity }
          : product,
      ),
    }));
  },

  increaseStock: async (productId, quantity) => {
    set((state) => ({
      products: state.products.map((product) =>
        product._id === productId
          ? { ...product, stock: product.stock + quantity }
          : product,
      ),
    }));
  },
}));

export default useProductStore;
