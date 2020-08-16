export interface EntityResponse<T> {
  data: T;
  permission: {
    update: boolean;
    delete: boolean;
  };
}
