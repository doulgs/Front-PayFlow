export interface UserMetadataDto {
  accepted_terms: boolean;
  document: string;
  email: string;
  email_verified: boolean;
  language: string;
  name: string;
  nickname: string;
  phone: string;
  phone_verified: boolean;
  sub: string;
  theme: string;
  image: string;
  user_type: "root" | "admin" | "manager" | "user" | "visitante";
}
