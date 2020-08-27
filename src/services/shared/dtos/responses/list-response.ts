export interface ListResponse<T> {
  data: T[];
  permission: {
    create: boolean;
  };
}
