import { create } from "zustand";
import { getCurrentUser } from "./auth.api";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  loading: false,
  setAuth: ({ user, token }) => {
    localStorage.setItem("accessToken", token);

    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  initializeAuth: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    set({ loading: true });

    try {
      const res = await getCurrentUser();

      set({
        user: res.data,
        token,
        isAuthenticated: true,
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      localStorage.removeItem("accessToken");
      set({ token: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
  setLoading: (value) => {
    set({ loading: value });
  },
}));

export default useAuthStore;
