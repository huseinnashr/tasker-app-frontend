import { HttpService } from "../http.service";
import { ManagerEDTO } from ".";

export class ManagerService extends HttpService {
  async get(id: number): Promise<ManagerEDTO> {
    return this.http<ManagerEDTO>("GET", `/manager/${id}`);
  }
}
