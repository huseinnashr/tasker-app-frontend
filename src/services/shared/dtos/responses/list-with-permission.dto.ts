import { ListPermissionDTO } from "./list-permission.dto";

export interface ListWithPermissionDTO<T> {
  data: T[];
  permission: ListPermissionDTO;
}
