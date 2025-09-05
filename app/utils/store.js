import { useQueryClient } from "@tanstack/react-query";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoggedIn: false,

  // Action to check the authentication status
  checkAuth: () => {
    const isLoggedIn =
      typeof window !== "undefined" && !!localStorage.getItem("access");
    set({ isLoggedIn });
  },

  // Optionally, add actions to log in and log out
  logIn: () => set({ isLoggedIn: true }),
  logOut: () => {
    localStorage.removeItem("access"); // Remove token or auth key
    set({ isLoggedIn: false });
  },
}));

export const useDarkMode = create((set) => ({
  isDarkMode:
    // (typeof window !== "undefined" && localStorage.getItem("isDarkMode")) ==
    // "false"
    //   ? false
    //   : true,
    true,

  setIsDarkMode: (res) => {
    set({ isDarkMode: res });
  },
}));
