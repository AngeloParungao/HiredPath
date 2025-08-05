import { create } from "zustand";
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL;

const useApplicationStore = create((set) => ({
  applications: [],
  loading: false,
  error: null,

  createApplication: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        `${backend_url}/api/application/create`,
        data
      );
      set((state) => ({
        applications: [...state.applications, res.data.application],
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to create application",
        loading: false,
      });
    }
  },

  fetchApplications: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${backend_url}/api/application/fetch/${id}`);
      set({ applications: res.data.applications, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to fetch applications",
        loading: false,
      });
    }
  },
}));

export default useApplicationStore;
