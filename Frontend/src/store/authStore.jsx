import { create } from "zustand";
import axios from "axios";
import useApplicationStore from "./applicationStore";
import useNotificationStore from "./notificationStore";
const backend_url = import.meta.env.VITE_BACKEND_URL;

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,

  handleLogin: async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await axios.post(`${backend_url}/api/user/login`, values, {
        headers: { "Content-Type": "application/json" },
      });

      const data = result.data;

      if (result.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        set({ isAuthenticated: true, user: data.user });
        useApplicationStore.getState().fetchApplications(data.user.id);
        useNotificationStore.getState().fetchNotifications(data.user.id);
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
