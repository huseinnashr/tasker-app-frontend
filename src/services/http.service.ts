import axios, { Method, AxiosRequestConfig } from "axios";
import { AppError } from "../interfaces";
import { SignInDTO } from "../dtos";
import { AuthStorageService } from "./auth-storage.service";

export class HttpService {
  BASE_URL = "http://localhost:3000";
  _auth: SignInDTO | null = null;

  constructor(private authStorage: AuthStorageService) {}

  async http<T>(method: Method, endpoint: string, data?: any): Promise<T> {
    const configs = this._getAxiosRequestConfig(method, endpoint, data);
    try {
      const res = await axios.request<T>(configs);
      return res.data;
    } catch (_error) {
      const error = this._handleHttpError(_error);
      const auth = this.authStorage.get();
      if (auth && error.code === 401) {
        this.authStorage.remove();
      }
      throw error;
    }
  }

  private _handleHttpError(e: any): AppError {
    if (e.response) {
      const { status, data } = e.response;
      if (data && data.message) {
        return { code: status as number, message: data.message };
      } else {
        return {
          code: status as number,
          message: `Unknown ${status} Server Response`,
        };
      }
    } else if (e.request) {
      return {
        code: 0,
        message: "You're offline or server is down",
      };
    } else {
      console.error(e);
      return {
        code: 0,
        message: "Client Error. Please Report to Dev",
      };
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
