import axios, { Method, AxiosRequestConfig } from "axios";
import { UserError, RedirectError } from "../interfaces";
import { AuthStorageService } from "./auth-storage";

interface DefaultAxiosConfig {
  method: Method;
  baseURL: string;
  url: string;
  data: any;
  headers: any;
}

type OtherAxiosConfig = Omit<AxiosRequestConfig, keyof DefaultAxiosConfig>;

export const BACKEND_URL = "http://localhost:3000";
export class HttpService {
  constructor(private authStorage: AuthStorageService) {}

  protected async http<T>(
    method: Method,
    endpoint: string,
    data?: any,
    config?: OtherAxiosConfig
  ): Promise<T> {
    const defaultConfig = this._getAxiosRequestConfig(method, endpoint, data);
    try {
      const res = await axios.request<T>({ ...defaultConfig, ...config });
      return res.data;
    } catch (_error) {
      const error = this._handleHttpError(_error);
      const auth = this.authStorage.get();
      if (auth && error.code === 401) {
        this.authStorage.remove();
        throw new RedirectError("Got 401 Unauthenticated. Logging out...");
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
  ): DefaultAxiosConfig {
    const auth = this.authStorage.get();

    return {
      method,
      baseURL: BACKEND_URL,
      url,
      data,
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    };
  }
}
