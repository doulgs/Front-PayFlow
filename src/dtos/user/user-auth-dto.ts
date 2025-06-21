import { UserMetadataDto } from "./user-metadata-dto";

export interface UserAuthDto {
  id: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  role: string;
  user_metadata: UserMetadataDto;
}
