export interface JwtPayload {
  readonly userId: number;
  readonly iat: string;
  readonly exp: Date;
}
