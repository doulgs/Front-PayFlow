import { UserRoleENUM, UserThemeENUM, UserLanguageENUM } from "./enums";

export interface UserDTO {
  id: string;
  document: string;
  nickname: string;
  name: string | null;
  email: string;
  image: string | null;
  phone: string | null;
  premium: boolean;
  update_at: string;
  created_at: string;
  org_name: string | null;
  user_type: UserRoleENUM;
  org_id: string | null;
  accepted_terms: boolean;
  theme: UserThemeENUM;
  language: UserLanguageENUM;
}
