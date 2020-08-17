import { RoleEnum } from "../enum";

export interface SignInDTO {
  accessToken: string;
  id: number;
  username: string;
  role: RoleEnum;
}
