import { UserRoleENUM, UserThemeENUM, UserLanguageENUM } from "./enums";

export interface UserRegisterDTO {
  nickname: string;
  name: string;
  document: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  org_name: string;
  org_id: string;
  user_type: UserRoleENUM;
  accepted_terms: boolean;
  theme: UserThemeENUM;
  language: UserLanguageENUM;
}
