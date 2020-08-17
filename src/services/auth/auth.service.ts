import { HttpService } from "../http.service";
import { SignInResponse } from "./auth.payload";

export class AuthService extends HttpService {
  async signin(username: string, password: string): Promise<SignInResponse> {
    const response = await this.http<SignInResponse>("POST", "/auth/signin", {
      username,
      password,
    });
    return response;
  }
}
