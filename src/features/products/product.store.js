import { create } from "zustand";
import { createProductApi } from "./product.api";

const useProductStore = create(() => ({
  createProduct: async (productData) => {
    const res = await createProductApi(productData);
    return res;
  },
}));

export default useProductStore;
