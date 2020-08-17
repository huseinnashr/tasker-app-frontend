import { observable, action } from "mobx";
import { AuthService, SignInDTO } from "../services";

export default class AuthStore {
  @observable auth: SignInDTO | null = null;

  constructor(private authService: AuthService) {
    this.auth = this.authService.loadAuth();
  }

  @action
  async signin(username: string, password: string) {
    const response = await this.authService.signin(username, password);
    this.auth = response.data;
  }

  @action
  signout() {
    this.auth = null;
    this.authService.removeAuth();
  }
}
