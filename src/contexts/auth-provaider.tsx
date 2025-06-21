import { UserAuthDto } from "@/dtos/user/user-auth-dto";
import { UserMetadataDto } from "@/dtos/user/user-metadata-dto";
import { RegisterDTO } from "@/dtos/user/user-register-dto";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useTheme } from "@/hooks/useTheme";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/storages/useUserStore";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "./toast-context";
import { useCustomNavigation } from "@/hooks/useCustomNavigation";

interface AuthContextProps {
  session: Session | null;
  user: UserAuthDto | null;
  isLoggedIn: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; data?: Session; error?: any }>;
  signUp: (data: RegisterDTO) => Promise<{ success: boolean; data?: Session; error?: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  isLoggedIn: false,
  loading: true,
  signIn: async () => {
    throw new Error("signIn function not implemented");
  },
  signUp: async () => {
    throw new Error("signUp function not implemented");
  },
  signOut: async () => {
    throw new Error("signOut function not implemented");
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const { user, setUser, clear } = useUserStore();
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useTheme();
  const { currentLanguage } = useChangeLanguage();
  const { showToast } = useToast();
  const { router } = useCustomNavigation();

  const notify = (type: "success" | "danger", text: string, description: string) => {
    showToast({ type, text, description, position: "bottom" });
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        console.error("Erro ao realizar login:", error.message);
        notify("danger", "Erro ao realizar login", error.message);
        return { success: false, error };
      }

      if (data.session?.user) {
        const user_metadata = data.session.user.user_metadata;
        const metadata = {
          accepted_terms: user_metadata.accepted_terms ?? false,
          document: user_metadata.document ?? "",
          email: user_metadata.email ?? "",
          email_verified: user_metadata.email_verified ?? false,
          language: user_metadata.language ?? "pt-BR",
          name: user_metadata.name ?? "",
          nickname: user_metadata.nickname ?? "",
          phone: user_metadata.phone ?? "",
          phone_verified: user_metadata.phone_verified ?? false,
          sub: user_metadata.sub ?? "",
          theme: user_metadata.theme ?? "light",
          image: user_metadata.image ?? null,
          user_type: user_metadata.user_type ?? "user",
        } as UserMetadataDto;
        setUser({
          id: data.session.user.id,
          email: data.session.user.email!,
          phone: metadata.phone,
          created_at: data.session.user.created_at ?? "",
          updated_at: data.session.user.updated_at ?? "",
          role: data.session.user.role ?? "authenticated",
          user_metadata: metadata,
        });
      }
      notify("success", "Login realizado", "Seja bem-vindo!");
      return { success: true, data: data.session };
    } catch (error: any) {
      console.error("Erro inesperado no login:", error.message);
      notify("danger", "Erro inesperado", error.message);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (dataUser: RegisterDTO) => {
    setLoading(true);
    try {
      const { email, password, nickname, name, document, phone, accepted_terms } = dataUser;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
            name,
            document,
            phone,
            image: dataUser.image ?? null,
            accepted_terms,
            theme: currentTheme,
            language: currentLanguage,
            org_name: dataUser.org_name ?? null,
            user_type: "user",
            org_id: dataUser.org_id ?? null,
          },
        },
      });
      if (error) {
        console.error(error);
        notify("danger", "Erro ao realizar cadastro", error.message);
        return { success: false, error };
      }
      notify("success", "Usuário Cadastrado", "Sucesso");
      return { success: true, data: data.session ?? undefined };
    } catch (error: any) {
      console.error(error);
      notify("danger", "Erro inesperado", error.message);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erro ao sair:", error.message);
        notify("danger", "Erro ao sair", error.message);
        return;
      }
      setSession(null);
      clear();
      router.replace("/(auth)");
      notify("success", "Logout realizado", "Até logo!");
    } catch (error: any) {
      console.error("Erro inesperado ao sair:", error.message);
      notify("danger", "Erro inesperado ao sair", error.message);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setSession(data.session);
        console.log("Sessão obtida:", data.session);
        if (data.session.user) {
          const user_metadata = data.session.user.user_metadata;
          const metadata = {
            accepted_terms: user_metadata.accepted_terms ?? false,
            document: user_metadata.document ?? "",
            email: user_metadata.email ?? "",
            email_verified: user_metadata.email_verified ?? false,
            language: user_metadata.language ?? "pt-BR",
            name: user_metadata.name ?? "",
            nickname: user_metadata.nickname ?? "",
            phone: user_metadata.phone ?? "",
            phone_verified: user_metadata.phone_verified ?? false,
            sub: user_metadata.sub ?? "",
            theme: user_metadata.theme ?? "light",
            image: user_metadata.image ?? null,
            user_type: user_metadata.user_type ?? "user",
          } as UserMetadataDto;
          setUser({
            id: data.session.user.id,
            email: data.session.user.email!,
            phone: metadata.phone,
            created_at: data.session.user.created_at ?? "",
            updated_at: data.session.user.updated_at ?? "",
            role: data.session.user.role ?? "authenticated",
            user_metadata: metadata,
          });
        }
      }
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        const user_metadata = newSession.user.user_metadata;
        const metadata = {
          accepted_terms: user_metadata.accepted_terms ?? false,
          document: user_metadata.document ?? "",
          email: user_metadata.email ?? "",
          email_verified: user_metadata.email_verified ?? false,
          language: user_metadata.language ?? "pt-BR",
          name: user_metadata.name ?? "",
          nickname: user_metadata.nickname ?? "",
          phone: user_metadata.phone ?? "",
          phone_verified: user_metadata.phone_verified ?? false,
          sub: user_metadata.sub ?? "",
          theme: user_metadata.theme ?? "light",
          image: user_metadata.image ?? null,
          user_type: user_metadata.user_type ?? "user",
        } as UserMetadataDto;
        setUser({
          id: newSession.user.id,
          email: newSession.user.email!,
          phone: metadata.phone,
          created_at: newSession.user.created_at ?? "",
          updated_at: newSession.user.updated_at ?? "",
          role: newSession.user.role ?? "authenticated",
          user_metadata: metadata,
        });
      } else {
        clear();
      }
    });

    getSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      router.replace("/(app)/(tabs)/(dashboard)");
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoggedIn: !!user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
