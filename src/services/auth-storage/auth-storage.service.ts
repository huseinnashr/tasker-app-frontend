import { SignInDTO } from "../auth";

export interface AuthStorageSubscriber {
  onAuthStorageChange: (auth: SignInDTO | null) => void;
}

export class AuthStorageService {
  private _auth: SignInDTO | null = null;
  private subscriber: AuthStorageSubscriber[] = [];

  addSubscriber(subscriber: AuthStorageSubscriber) {
    this.subscriber.push(subscriber);
  }

  constructor() {
    const auth = this.load();
    this.set(auth);
  }

  private emitChange() {
    this.subscriber.forEach((s) => {
      s.onAuthStorageChange(this._auth);
    });
  }

  private set(auth: SignInDTO | null) {
    this._auth = auth;
    this.emitChange();
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
