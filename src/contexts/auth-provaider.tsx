import { ResponseDTO } from "@/dtos/shared";
import { UserLoginDTO, UserRegisterDTO } from "@/dtos/user";
import { useCustomNavigation } from "@/hooks/useCustomNavigation";
import { supabase } from "@/lib/supabase";
import { userService } from "@/services/user-service";
import { useUserStore } from "@/storages/useUserStore";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface AuthContextData {
  signIn: (credentials: UserLoginDTO) => Promise<ResponseDTO<{ id: string }>>;
  signUp: (data: UserRegisterDTO) => Promise<ResponseDTO<null>>;
  signOut: () => Promise<ResponseDTO<null>>;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { router } = useCustomNavigation();
  const { setUser, clear } = useUserStore();
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user.id;

    if (userId) {
      const response = await userService.getUser(userId);
      if (response.isValid && response.data) {
        setUser(response.data);
      }
    }
    setLoading(false);
  }

  async function signIn(credentials: UserLoginDTO) {
    const response = await userService.signIn(credentials);
    if (response.isValid) {
      await loadUser();
    }
    return response;
  }

  async function signUp(data: UserRegisterDTO) {
    const response = await userService.signUp(data);
    return response;
  }

  async function signOut() {
    const response = await userService.signOut();
    if (response.isValid) {
      router.replace("/(auth)");
      clear();
    }
    return response;
  }

  useEffect(() => {
    loadUser();
  }, []);

  return <AuthContext.Provider value={{ signIn, signUp, signOut, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
