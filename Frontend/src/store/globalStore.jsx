import { create } from "zustand";

const useGlobalStore = create((set) => ({
  online: navigator.onLine,
  setOnline: (value) => set({ online: value }),

  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },
  showSnackbar: (message, severity = "info") =>
    set({
      snackbar: { open: true, message, severity },
    }),
  hideSnackbar: () =>
    set((state) => ({
      snackbar: { ...state.snackbar, open: false },
    })),
}));

export default useGlobalStore;
