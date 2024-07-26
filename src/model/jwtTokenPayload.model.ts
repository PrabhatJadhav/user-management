import { UserRoles } from "../enums/roleEnums.ts";

export interface JwtTokenPayload {
  userId: string | number;
  role: UserRoles;
  iat?: number;
  exp?: string;
}
