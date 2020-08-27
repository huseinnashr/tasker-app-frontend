import { ListResponse, ListEntityResponse, EntityResponse } from "..";
import { EmployeeDTO } from "./dtos/responses/employee.dto";
import { RoleEnum } from "../../enum";

export type CreateEmployeeDTO = {
  username: string;
  password: string;
  role: RoleEnum;
};

export type UpdateEmployeeDTO = CreateEmployeeDTO;

export type EmployeeListResponse = ListResponse<EmployeeDTO>;
export type EmployeeListEntityResponse = ListEntityResponse<EmployeeDTO>;
export type EmployeeEntityResponse = EntityResponse<EmployeeDTO>;

export interface ProfilePictureDTO {
  url: string;
}

export interface ProfilePictureEntityResponse
  extends EntityResponse<ProfilePictureDTO> {}
