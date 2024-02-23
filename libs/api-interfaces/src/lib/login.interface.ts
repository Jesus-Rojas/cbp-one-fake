import { AuthUser } from "./auth-user.interface";

export interface Login extends Omit<AuthUser, 'id'> { }