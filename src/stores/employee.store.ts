import { observable } from "mobx";
import { EmployeeService } from "../services";

export class EmployeeStore {
  @observable employees: any;

  constructor(private employeeService: EmployeeService) {}
}
