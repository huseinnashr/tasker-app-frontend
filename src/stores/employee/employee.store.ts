import { observable, action } from "mobx";
import { EmployeeService } from "../../services";
import { EmployeeListResponse } from "../../services/employee/employee.payload";

export class EmployeeStore {
  @observable employees: EmployeeListResponse = {
    data: [],
    permission: { create: false },
  };

  constructor(private employeeService: EmployeeService) {}

  @action
  async getAll() {
    const response = await this.employeeService.getAll();
    this.employees = response;
  }
}
