import { create } from "zustand";
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL;

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,

  handleLogin: async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await axios.post(`${backend_url}/api/user/login`, values, {
        headers: { "Content-Type": "application/json" },
      });

      const data = result.data;

      if (result.status === 200) {
        localStorage.setItem("token", data.token);
        console.log("Login success:", data);
        set({ isAuthenticated: true, user: data.user });
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  },

  logout: async () => {
    localStorage.clear();
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
