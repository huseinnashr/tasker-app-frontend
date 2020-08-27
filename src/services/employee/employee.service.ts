import { HttpService } from "../http.service";
import {
  EmployeeListResponse,
  EmployeeListEntityResponse,
  CreateEmployeeDTO,
  EmployeeEntityResponse,
  ProfilePictureEntityResponse,
} from "./employee.payload";
import { OnUploadProgress } from "../interfaces";

type L = EmployeeListResponse;
type LE = EmployeeListEntityResponse;
type E = EmployeeEntityResponse;
type PPE = ProfilePictureEntityResponse;

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

  async delete(id: number): Promise<void> {
    return this.http("DELETE", `/employee/${id}`);
  }

  async upload(
    data: FormData,
    onUploadProgress: OnUploadProgress
  ): Promise<PPE> {
    return this.http<PPE>("POST", `/employee/profile-picture`, data, {
      onUploadProgress,
    });
  }
}
