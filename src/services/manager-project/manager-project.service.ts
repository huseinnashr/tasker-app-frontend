import { HttpService } from "../http.service";
import { ManagerProjectEDTO } from ".";

export class ManagerProjectService extends HttpService {
  async get(id: number): Promise<ManagerProjectEDTO> {
    return this.http<ManagerProjectEDTO>("GET", `/manager/${id}`);
  }
}
