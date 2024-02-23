import { Payload } from "./payload.interface";

export interface LoginResponse {
  expiresIn: string;
  user: Payload,
  accessToken: string;
}
