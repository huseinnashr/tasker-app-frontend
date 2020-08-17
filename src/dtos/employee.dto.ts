import { RoleEnum } from "../enum";

export interface EmployeeDTO {
  id: number;
  username: string;
  role: RoleEnum;
}