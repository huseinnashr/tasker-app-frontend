import axios, { Method, AxiosRequestConfig } from "axios";
import { UserError } from "../interfaces";
import { AuthStorageService } from "./auth-storage.service";

export class HttpService {
  private BASE_URL = "http://localhost:3000";

  constructor(private authStorage: AuthStorageService) {}

  protected async http<T>(
    method: Method,
    endpoint: string,
    data?: any
  ): Promise<T> {
    const configs = this._getAxiosRequestConfig(method, endpoint, data);
    try {
      const res = await axios.request<T>(configs);
      return res.data;
    } catch (_error) {
      const error = this._handleHttpError(_error);
      const auth = this.authStorage.get();
      if (auth && error.code === 401) {
        this.authStorage.remove();
        error.willUnmount = true;
      }
      throw error;
    }
  }

  private _handleHttpError(e: any): UserError {
    if (e.response) {
      const { status, data } = e.response;
      if (data && data.message) {
        return new UserError(status as number, data.message);
      } else {
        return new UserError(
          status as number,
          `Unknown ${status} Server Response`
        );
      }
    } else if (e.request) {
      return new UserError(0, "You're offline or server is down");
    } else {
      console.error(e);
      return new UserError(0, "Client Error. Please Report to Dev");
    }
  }

  private _getAxiosRequestConfig(
    method: Method,
    url: string,
    data?: any
  ): AxiosRequestConfig {
    const auth = this.authStorage.get();

    return {
      method,
      baseURL: this.BASE_URL,
      url,
      data,
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    };
  }
}
