import { UserAuthDto } from "@/dtos/user/user-auth-dto";
import { AuthTokensDto } from "@/dtos/user/users-tokens-dto";
import { create } from "zustand";

interface UserStore {
  user: UserAuthDto | null;
  tokens: AuthTokensDto | null;
  setUser: (user: UserAuthDto) => void;
  setTokens: (tokens: AuthTokensDto) => void;
  clear: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  tokens: null,
  setUser: (user) => set({ user }),
  setTokens: (tokens) => set({ tokens }),
  clear: () => set({ user: null, tokens: null }),
}));
