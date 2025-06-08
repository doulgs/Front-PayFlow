import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface VisibilityState {
  isVisible: boolean;
  toggleVisibility: () => void;
  setVisible: (value: boolean) => void;
}

export const useVisibilityStore = create<VisibilityState>()(
  persist(
    (set) => ({
      isVisible: true,
      toggleVisibility: () => set((state) => ({ isVisible: !state.isVisible })),
      setVisible: (value) => set({ isVisible: value }),
    }),
    {
      name: "visibility-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
