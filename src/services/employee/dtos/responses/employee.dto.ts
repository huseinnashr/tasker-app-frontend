import { RoleEnum } from "../../../../enum";

export interface EmployeeDTO {
  id: number;
  username: string;
  fristName: string;
  lastName: string;
  role: RoleEnum;
  email: string;
  profilePicture: string;
}
