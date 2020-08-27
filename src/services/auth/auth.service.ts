import { HttpService } from "../http.service";
import { SignInEDTO } from ".";

export class AuthService extends HttpService {
  async signin(username: string, password: string): Promise<SignInEDTO> {
    const response = await this.http<SignInEDTO>("POST", "/auth/signin", {
      username,
      password,
    });
    return response;
  }
}
