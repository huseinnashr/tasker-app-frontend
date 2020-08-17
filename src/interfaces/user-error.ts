export class UserError {
  constructor(
    public code: number,
    public message: string | string[],
    /** Indicate if the current component will be unmount due to app state changes */
    public willUnmount: boolean = false
  ) {}
}
