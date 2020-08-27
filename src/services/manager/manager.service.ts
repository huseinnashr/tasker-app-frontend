import { HttpService } from "../http.service";
import { ManagerEDTO } from "./manager.payload";

export class ManagerService extends HttpService {
  async get(id: number): Promise<ManagerEDTO> {
    return this.http<ManagerEDTO>("GET", `/manager/${id}`);
  }
}
