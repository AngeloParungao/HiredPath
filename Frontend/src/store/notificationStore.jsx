import axios from "axios";
import { create } from "zustand";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const useNotificationStore = create((set, get) => ({
  loading: false,
  notifications: [],

  fetchNotifications: async (id) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token"); // get latest token
      const res = await axios.get(
        `${backend_url}/api/notification/fetch/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  updateNotificationIsRead: async (userId) => {
    const { notifications } = get();
    try {
      const token = localStorage.getItem("token"); // get latest token
      const res = await axios.put(
        `${backend_url}/api/notification/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedIds = res.data.notifications.map((n) => n.id);

      set({
        notifications: notifications.map((notification) =>
          updatedIds.includes(notification.id)
            ? { ...notification, is_read: true }
            : notification
        ),
      });
    } catch (error) {
      console.error("Error updating notifications", error);
    }
  },
}));

export default useNotificationStore;
