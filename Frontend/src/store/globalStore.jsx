import { create } from "zustand";

const useGlobalStore = create((set) => ({
  theme: "light",
  online: navigator.onLine,

  setOnline: (value) => set({ online: value }),
  setTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),

  //   snackbar: {
  //     open: false,
  //     message: "",
  //     severity: "info",
  //   },
  //   showSnackbar: (message, severity = "info") =>
  //     set({
  //       snackbar: { open: true, message, severity },
  //     }),
  //   hideSnackbar: () =>
  //     set((state) => ({
  //       snackbar: { ...state.snackbar, open: false },
  //     })),
}));

export default useGlobalStore;
