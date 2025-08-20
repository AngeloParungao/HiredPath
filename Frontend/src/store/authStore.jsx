import { create } from "zustand";
import axios from "axios";
import useApplicationStore from "./applicationStore";
import useNotificationStore from "./notificationStore";
import useGlobalStore from "./globalStore";
const backend_url = import.meta.env.VITE_BACKEND_URL;

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,

  handleGoogleLogin: async (credentialResponse) => {
    try {
      const result = await axios.post(
        `${backend_url}/api/auth/google`,
        { credential: credentialResponse.credential }, // 👈 FIXED
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = result.data;

      if (result.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        set({ isAuthenticated: true, user: data.user });
        useApplicationStore.getState().fetchApplications(data.user.id);
        useNotificationStore.getState().fetchNotifications(data.user.id);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      console.error("Something went wrong:", error);
      useGlobalStore.getState().showSnackbar(errorMessage, "error");
    }
  },

  handleLogin: async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await axios.post(`${backend_url}/api/auth/login`, values, {
        headers: { "Content-Type": "application/json" },
      });

      const data = result.data;

      if (result.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        set({ isAuthenticated: true, user: data.user });
        useApplicationStore.getState().fetchApplications(data.user.id);
        useNotificationStore.getState().fetchNotifications(data.user.id);
        setSubmitting(false);
        resetForm();
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      console.error("Something went wrong:", error);
      useGlobalStore.getState().showSnackbar(errorMessage, "error");
    }
  },

  handleRegister: async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem("token");
    try {
      const result = await axios.post(
        `${backend_url}/api/auth/register`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = result.data;

      if (result.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        set({ isAuthenticated: true, user: data.user });
        setSubmitting(false);
        resetForm();
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      console.error("Something went wrong:", error);
      useGlobalStore.getState().showSnackbar(errorMessage, "error");
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false, user: null });
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
  },

  requestResetPassword: async (email) => {
    try {
      const result = await axios.post(`${backend_url}/api/auth/request-reset`, {
        email,
      });

      if (result.status === 200) {
        useGlobalStore
          .getState()
          .showSnackbar(result?.data?.message, "success");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      console.error("Something went wrong:", error);
      useGlobalStore.getState().showSnackbar(errorMessage, "error");
    }
  },

  resetPassword: async (token, values) => {
    try {
      const result = await axios.post(
        `${backend_url}/api/auth/reset-password`,
        {
          token,
          password: values.password,
        }
      );

      if (result.status === 200) {
        useGlobalStore
          .getState()
          .showSnackbar(result?.data?.message, "success");
        return true;
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      console.error("Something went wrong:", error);
      useGlobalStore.getState().showSnackbar(errorMessage, "error");
      return false;
    }
  },
}));

export default useAuthStore;
