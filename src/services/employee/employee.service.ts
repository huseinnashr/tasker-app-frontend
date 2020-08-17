import { HttpService } from "../http.service";
import {
  EmployeeListResponse,
  EmployeeListEntityResponse,
  CreateEmployeeDTO,
} from "./employee.payload";

export class EmployeeService extends HttpService {
  async getAll(): Promise<EmployeeListResponse> {
    return this.http<EmployeeListResponse>("GET", "/employee");
  }

  async create(data: CreateEmployeeDTO): Promise<EmployeeListEntityResponse> {
    return this.http<EmployeeListEntityResponse>("POST", "/employee", data);
  }
}
