import { SignInDTO } from "../dtos";

export class AuthStorageService {
  private _auth: SignInDTO | null = null;

  constructor() {
    const auth = this.load();
    this.set(auth);
  }

  private set(auth: SignInDTO | null) {
    this._auth = auth;
  }

  private load(): SignInDTO | null {
    const authString = localStorage.getItem("auth");
    const auth = authString ? (JSON.parse(authString) as SignInDTO) : null;

    return auth;
  }

  save(auth: SignInDTO) {
    this.set(auth);

    const authString = JSON.stringify(auth);

    return localStorage.setItem("auth", authString);
  }

  get(): SignInDTO | null {
    return this._auth;
  }

  remove() {
    this.set(null);
    localStorage.removeItem("auth");
  }
}
