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

  updateApplication: async (id, status, interviewDate) => {
    const data = {};

    if (status) {
      data.status = status;
    }
    if (interviewDate) {
      data.interview_date = interviewDate;
    }

    set({ error: null });
    try {
      const res = await axios.put(`${backend_url}/api/application/${id}`, data);
      set((state) => ({
        applications: state.applications.map((application) =>
          application.id === id
            ? { ...application, ...res.data.application }
            : application
        ),
      }));
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to update application",
      });
    }
  },

  deleteApplications: async (ids) => {
    set({ error: null });
    try {
      await axios.delete(`${backend_url}/api/application/`, {
        data: { ids },
      });

      set((state) => ({
        applications: state.applications.filter(
          (application) => !ids.includes(application.id)
        ),
      }));
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to delete applications",
      });
    }
  },
}));

export default useApplicationStore;
