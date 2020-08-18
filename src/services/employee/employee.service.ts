import { HttpService } from "../http.service";
import {
  EmployeeListResponse,
  EmployeeListEntityResponse,
  CreateEmployeeDTO,
  EmployeeEntityResponse,
} from "./employee.payload";

type L = EmployeeListResponse;
type LE = EmployeeListEntityResponse;
type E = EmployeeEntityResponse;

export class EmployeeService extends HttpService {
  async getAll(): Promise<L> {
    return this.http<L>("GET", "/employee");
  }

  async create(data: CreateEmployeeDTO): Promise<LE> {
    return this.http<LE>("POST", "/employee", data);
  }

  async get(id: number): Promise<E> {
    return this.http<E>("GET", `/employee/${id}`);
  }

  async update(id: number, data: CreateEmployeeDTO): Promise<LE> {
    return this.http<LE>("PUT", `/employee/${id}`, data);
  }
}
