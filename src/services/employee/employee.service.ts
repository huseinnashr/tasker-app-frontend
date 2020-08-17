import { HttpService } from "../http.service";
import { EmployeeListResponse } from "./employee.payload";

export class EmployeeService extends HttpService {
  async getAll(): Promise<EmployeeListResponse> {
    return this.http<EmployeeListResponse>("GET", "/employee");
  }
}
