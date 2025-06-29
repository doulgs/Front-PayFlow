export type UserRole = "admin" | "manager" | "user";
export interface UserOrganizationRoleDTO {
  id: string;
  userId: string;
  tenantId: string;
  role: UserRole;
  createdAt?: string;
}
