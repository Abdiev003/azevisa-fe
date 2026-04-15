"use client";

import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createUserStore, UserStore } from "@/store/user-store";
import { User } from "@/data/user";

const UserStoreContext = createContext<UserStore | null>(null);

export function UserStoreProvider({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  const [store] = useState(() => createUserStore(user));

  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  );
}

export function useUserStore() {
  const store = useContext(UserStoreContext);
  if (!store) throw new Error("useUserStore must be used within UserStoreProvider");
  return useStore(store);
}
