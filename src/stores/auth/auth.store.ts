import { observable, action } from "mobx";
import {
  AuthStorageSubscriber,
  AuthStorageService,
} from "../../services/auth-storage";
import { SignInDTO, AuthService } from "../../services/auth";

export class AuthStore implements AuthStorageSubscriber {
  @observable auth: SignInDTO | null = null;

  constructor(
    private authService: AuthService,
    private authStorage: AuthStorageService
  ) {
    this.authStorage.addSubscriber(this);
    this.auth = this.authStorage.get();
  }

  onAuthStorageChange(auth: SignInDTO | null) {
    this.auth = auth;
  }

  @action
  async signin(username: string, password: string) {
    const response = await this.authService.signin(username, password);
    this.authStorage.save(response.data);
    this.auth = response.data;
  }

  @action
  signout() {
    this.auth = null;
    this.authStorage.remove();
  }
}
