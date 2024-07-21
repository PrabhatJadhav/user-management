import { UserRoles } from "../enums/roleEnums";

export interface JwtTokenPayload {
  userId: string | number;
  role: UserRoles;
}
