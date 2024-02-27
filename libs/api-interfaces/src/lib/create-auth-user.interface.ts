import { AuthUser } from "./auth-user.interface";

export interface CreateAuthUser extends Omit<AuthUser, 'id' | 'role'> { }