import { RoleType } from "./role-type.enum";

export interface JwtPayload {
  readonly username: string;
  readonly userId: number;
  readonly role: RoleType;
  readonly iat: number;
  readonly exp: number;
}