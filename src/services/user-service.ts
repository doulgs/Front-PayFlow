import { UserRegisterDTO, UserDTO, UserLoginDTO } from "@/dtos/user";
import { ResponseDTO } from "@/dtos/shared";
import { supabase } from "@/lib/supabase";

const UserService = {
  async getUser(id: string): Promise<ResponseDTO<UserDTO>> {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single();

    if (error) return { isValid: false, msg: error.message, data: null };
    return { isValid: true, msg: "User successfully retrieved", data: data as UserDTO };
  },

  async getUserByEmail(email: string): Promise<ResponseDTO<UserDTO>> {
    const { data, error } = await supabase.from("users").select("*").eq("email", email).maybeSingle();

    if (error) {
      return { isValid: false, msg: error.message, data: null };
    }
    if (!data) {
      return { isValid: false, msg: "User not found", data: null };
    }
    return { isValid: true, msg: "User successfully retrieved", data: data as UserDTO };
  },

  async updateUser(id: string, updates: Partial<UserRegisterDTO>): Promise<ResponseDTO<null>> {
    const { error } = await supabase.from("users").update(updates).eq("id", id);

    if (error) return { isValid: false, msg: error.message, data: null };
    return { isValid: true, msg: "User successfully updated", data: null };
  },

  async signIn(credentials: UserLoginDTO): Promise<ResponseDTO<{ id: string }>> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) return { isValid: false, msg: error.message, data: null };
    if (!data.user) {
      return { isValid: false, msg: "User not found", data: null };
    }
    if (!data.session) {
      return { isValid: false, msg: "Session not found", data: null };
    }
    if (!data.user.id) {
      return { isValid: false, msg: "User ID not found", data: null };
    }
    return { isValid: true, msg: "Login successful", data: { id: data.user.id } };
  },

  async signUp(dataUser: UserRegisterDTO): Promise<ResponseDTO<null>> {
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
          theme: "system",
          language: "pt",
          org_name: dataUser.org_name ?? null,
          user_type: "user",
          org_id: dataUser.org_id ?? null,
        },
      },
    });

    if (error) return { isValid: false, msg: error.message, data: null };

    return { isValid: true, msg: "Signup successful", data: null };
  },

  async signOut(): Promise<ResponseDTO<null>> {
    const { error } = await supabase.auth.signOut();

    if (error) return { isValid: false, msg: error.message, data: null };
    return { isValid: true, msg: "Logout successful", data: null };
  },
};

export const userService = UserService;
