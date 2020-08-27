import React, { Component } from "react";
import { Button, Table, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { EmployeeStore } from "../../stores";
import { EmployeeDTO } from "../../services/employee/dtos/responses/employee.dto";
import { inject, observer } from "mobx-react";
import { EmployeeManageDrawer } from "..";

interface Props {
  employeeStore?: EmployeeStore;
}

interface States {
  employeeLoading: boolean;
}

@inject("employeeStore")
@observer
export class EmployeeListPage extends Component<Props, States> {
  columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: EmployeeDTO) => (
        <span>
          <button
            onClick={() => this.createDrawer.current?.openDrawer(record.id)}
            style={{ marginRight: "8px" }}
          >
            Detail
          </button>
        </span>
      ),
    },
  ];

  createDrawer = React.createRef<EmployeeManageDrawer>();

  constructor(props: Props) {
    super(props);

    this.state = {
      employeeLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ employeeLoading: true });
    await this.props.employeeStore!.getAll();
    this.setState({ employeeLoading: false });
  }

  render() {
    const { employees } = this.props.employeeStore!;
    return (
      <div style={{ background: "#fff" }}>
        <Typography.Title level={1}>Manage Employee</Typography.Title>
        <Button
          disabled={this.state.employeeLoading}
          type="primary"
          style={{ marginBottom: "16px" }}
          icon={<PlusOutlined />}
          onClick={() => this.createDrawer.current?.openDrawer()}
        >
          Create an Employee
        </Button>
        <Table
          rowKey="id"
          columns={this.columns}
          loading={this.state.employeeLoading}
          dataSource={employees.data}
        />
        <EmployeeManageDrawer ref={this.createDrawer} />
      </div>
    );
  }
}
