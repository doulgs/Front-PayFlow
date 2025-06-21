export interface RegisterDTO {
  nickname: string;
  name: string;
  document: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  org_name: string;
  org_id: string;
  user_type: "root" | "admin" | "manager" | "user" | "visitante";
  accepted_terms: boolean;
  theme: "light" | "dark" | "system";
  language: "en" | "pt" | string;
}
