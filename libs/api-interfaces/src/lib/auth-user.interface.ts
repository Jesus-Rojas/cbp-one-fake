import { RoleType } from "./role-type.enum";

export interface AuthUser {
  id: number;
  username: string;
  password: string;
  role: RoleType;
}