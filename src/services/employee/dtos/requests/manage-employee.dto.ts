import { RoleEnum } from "../../../../enum";

export interface ManageEmployeeDTO {
  username: string;
  password: string;
  role: RoleEnum;
}
