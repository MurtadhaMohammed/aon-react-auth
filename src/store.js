import { create } from "zustand";

export const useAppStore = create((set) => ({
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin }),
}));
