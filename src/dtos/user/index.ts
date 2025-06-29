export interface UserDTO {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt?: string;
  updatedAt?: string;
}
