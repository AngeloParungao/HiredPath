import axios from "axios";
import { create } from "zustand";
const backend_url = import.meta.env.VITE_BACKEND_URL;

const useNotificationStore = create((set) => ({
  loading: false,
  notifications: [],

  fetchNotifications: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(
        `${backend_url}/api/notification/fetch/${id}`
      );

      set({
        notifications: res.data.notifications,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching notifications", error);
      set({
        loading: false,
      });
    }
  },
}));

export default useNotificationStore;
