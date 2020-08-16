import { HttpService } from "../http.service";
import { SignInResponse } from ".";

export class AuthService extends HttpService {
  async signin(username: string, password: string): Promise<SignInResponse> {
    const response = await this.http<SignInResponse>("POST", "/auth/signin", {
      username,
      password,
    });
    this.saveToken(response.data.accessToken);
    return response;
  }

  async signout(): Promise<void> {
    this.removeToken();
  }
}
