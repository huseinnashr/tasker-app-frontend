import { observable, action } from "mobx";
import { AuthService, AuthStorageService } from "../../services";
import { SignInDTO } from "../../dtos";

export class AuthStore {
  @observable auth: SignInDTO | null = null;

  constructor(
    private authService: AuthService,
    private authStorage: AuthStorageService
  ) {
    this.auth = this.authStorage.get();
  }

  @action
  async signin(username: string, password: string) {
    const response = await this.authService.signin(username, password);
    this.auth = response.data;
    this.authStorage.save(this.auth);
  }

  @action
  signout() {
    this.auth = null;
    this.authStorage.remove();
  }
}
