import { observable, action } from "mobx";
import { ManagerService, ManagerEDTO } from "../../services/manager";

export class ManagerStore {
  @observable manager: ManagerEDTO | null = null;

  constructor(private managerService: ManagerService) {}

  @action
  async get(id: number): Promise<ManagerEDTO> {
    const response = await this.managerService.get(id);
    this.manager = response;
    return this.manager;
  }
}
