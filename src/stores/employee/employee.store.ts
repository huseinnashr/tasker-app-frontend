import { observable, action } from "mobx";
import { EmployeeService, OnUploadProgress } from "../../services";
import {
  EmployeeListResponse,
  CreateEmployeeDTO,
  EmployeeEntityResponse,
  UpdateEmployeeDTO,
  ProfilePictureEntityResponse,
} from "../../services/employee/employee.payload";

export class EmployeeStore {
  @observable employees: EmployeeListResponse = {
    data: [],
    permission: { create: false },
  };
  @observable employee: EmployeeEntityResponse | null = null;

  constructor(private employeeService: EmployeeService) {}

  @action
  async getAll() {
    const response = await this.employeeService.getAll();
    this.employees = response;
  }

  @action
  async create(data: CreateEmployeeDTO) {
    const response = await this.employeeService.create(data);
    this.employees.data = observable.array([
      ...this.employees.data,
      response.data,
    ]);
  }

  @action
  async get(id: number): Promise<EmployeeEntityResponse> {
    const response = await this.employeeService.get(id);
    this.employee = response;
    return this.employee;
  }

  @action
  async update(id: number, data: UpdateEmployeeDTO) {
    const response = await this.employeeService.update(id, data);
    const idx = this.employees.data.findIndex((e) => e.id === id);
    this.employees.data[idx] = response.data;
    this.employees.data = observable.array(this.employees.data);
  }

  @action
  async upsert(id: number | null, data: CreateEmployeeDTO | UpdateEmployeeDTO) {
    if (id) {
      return this.update(id, data);
    } else {
      return this.create(data);
    }
  }

  @action
  async delete(id: number) {
    await this.employeeService.delete(id);
    this.employees.data = observable.array(
      this.employees.data.filter((e) => e.id !== id)
    );
  }

  @action
  async upload(
    data: FormData,
    onUploadProgress: OnUploadProgress
  ): Promise<ProfilePictureEntityResponse> {
    return this.employeeService.upload(data, onUploadProgress);
  }
}
