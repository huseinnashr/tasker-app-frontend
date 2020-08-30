import { HttpService } from "../http.service";
import {
  EmployeeLWPDTO,
  EmployeeEWPDTO,
  EmployeeEDTO,
  CreateEmployeeDTO,
} from ".";

export class EmployeeService extends HttpService {
  async getAll(): Promise<EmployeeLWPDTO> {
    return this.http<EmployeeLWPDTO>("GET", "/employee");
  }

  async create(data: CreateEmployeeDTO): Promise<EmployeeEDTO> {
    return this.http<EmployeeEDTO>("POST", "/employee", data);
  }

  async get(id: number): Promise<EmployeeEWPDTO> {
    return this.http<EmployeeEWPDTO>("GET", `/employee/${id}`);
  }

  async update(id: number, data: CreateEmployeeDTO): Promise<EmployeeEDTO> {
    return this.http<EmployeeEDTO>("PUT", `/employee/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    return this.http("DELETE", `/employee/${id}`);
  }
}
