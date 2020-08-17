import { SignInDTO } from "../dtos";

export class AuthStorageService {
  private _auth: SignInDTO | null = null;

  save(auth: SignInDTO) {
    this._auth = auth;

    const authString = JSON.stringify(auth);

    return localStorage.setItem("auth", authString);
  }

  load(): SignInDTO | null {
    if (this._auth) return this._auth;

    const authString = localStorage.getItem("auth");
    const auth = authString ? (JSON.parse(authString) as SignInDTO) : null;

    this._auth = auth;

    return auth;
  }

  remove() {
    localStorage.removeItem("auth");
  }
}
