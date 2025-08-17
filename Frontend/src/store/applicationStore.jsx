import { create } from "zustand";
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL;

const useApplicationStore = create((set, get) => ({
  applications: [],
  filteredApplications: [],
  loading: false,
  error: null,

  createApplication: async (data) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${backend_url}/api/application/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${backend_url}/api/application/fetch/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({
        applications: res.data.applications,
        filteredApplications: res.data.applications,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to fetch applications",
        loading: false,
      });
    }
  },

  filterApplications: (searchTerm, statusFilter) => {
    const { applications } = get();
    let filteredApplications = applications;

    set({ loading: true });

    const timeoutId = get().timeoutId;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(async () => {
      if (searchTerm) {
        filteredApplications = filteredApplications.filter(
          (application) =>
            application.company
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            application.job_title
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      }

      if (statusFilter) {
        filteredApplications = filteredApplications.filter(
          (application) => application.status === statusFilter
        );
      }

      set({ loading: false, filteredApplications, timeoutId: null });
    }, 1000);

    set({ timeoutId: newTimeoutId });
  },

  updateApplication: async (id, status, interviewDate) => {
    const data = {};
    if (status) data.status = status;
    if (interviewDate) data.interview_date = interviewDate;

    set({ error: null });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${backend_url}/api/application/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        applications: state.applications.map((application) =>
          application.id === id
            ? { ...application, ...res.data.application }
            : application
        ),
        filteredApplications: state.filteredApplications.map((application) =>
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
      const token = localStorage.getItem("token");
      await axios.delete(`${backend_url}/api/application/`, {
        data: { ids },
        headers: { Authorization: `Bearer ${token}` },
      });

      set((state) => ({
        applications: state.applications.filter(
          (application) => !ids.includes(application.id)
        ),
        filteredApplications: state.filteredApplications.filter(
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
