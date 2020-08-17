import axios, { Method, AxiosRequestConfig } from "axios";
import { RouterStore } from "mobx-react-router";
import { AppError } from "../interfaces";
import { SignInDTO } from "./auth";

export class HttpService {
  BASE_URL = "http://localhost:3000";
  _auth: SignInDTO | null = null;

  constructor(private routerStore: RouterStore) {}

  async http<T>(method: Method, endpoint: string, data: any): Promise<T> {
    const configs = this._getAxiosRequestConfig(method, endpoint, data);
    try {
      const res = await axios.request<T>(configs);
      return res.data;
    } catch (error) {
      throw this._handleHttpError(error);
    }
  }

  _handleHttpError(e: any): AppError {
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

  _handle401() {
    this.routerStore.push("/signin");
  }

  _getAxiosRequestConfig(
    method: Method,
    url: string,
    data: any
  ): AxiosRequestConfig {
    const auth = this.loadAuth();

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

  get Auth() {
    return this._auth ? this._auth : this.loadAuth();
  }

  saveAuth(auth: SignInDTO) {
    this._auth = auth;

    const authString = JSON.stringify(auth);

    return localStorage.setItem("auth", authString);
  }

  loadAuth(): SignInDTO | null {
    const authString = localStorage.getItem("auth");
    const auth = authString ? (JSON.parse(authString) as SignInDTO) : null;

    this._auth = auth;

    return auth;
  }

  removeAuth() {
    localStorage.removeItem("auth");
  }
}
