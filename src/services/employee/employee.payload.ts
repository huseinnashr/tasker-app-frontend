import { ListResponse, ListEntityResponse } from "..";
import { EmployeeDTO } from "../../dtos/employee.dto";
import { RoleEnum } from "../../enum";

export type CreateEmployeeDTO = {
  username: string;
  password: string;
  role: RoleEnum;
};

export type EmployeeListResponse = ListResponse<EmployeeDTO>;
export type EmployeeListEntityResponse = ListEntityResponse<EmployeeDTO>;
