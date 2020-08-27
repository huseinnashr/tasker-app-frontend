import { EntityPermissionDTO } from "./entity-permission.dto";

export interface EntityWithPermissionDTO<T> {
  data: T;
  permission: EntityPermissionDTO;
}
