import { createStore } from "zustand";
import { User } from "@/data/user";

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export type UserStore = ReturnType<typeof createUserStore>;

export const createUserStore = (initialUser: User | null) =>
  createStore<UserState>()((set) => ({
    user: initialUser,
    setUser: (user) => set({ user }),
  }));
