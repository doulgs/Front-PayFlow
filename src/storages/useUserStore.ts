import { UserDTO } from "@/dtos/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage } from "zustand/middleware";

interface UserStore {
  user: UserDTO | null;
  userId: string | null;
  setUser: (user: UserDTO) => void;
  setUserId: (id: string | null) => void;
  clear: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      userId: null,
      setUser: (user) => set({ user, userId: user.id }),
      setUserId: (id) => set({ userId: id }),
      clear: () => set({ user: null, userId: null }),
    }),
    {
      name: "user-id",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ userId: state.userId }),
    }
  )
);
