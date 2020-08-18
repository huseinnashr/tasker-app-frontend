import React, { Component } from "react";
import { Button, Form, Input, Drawer, Alert, Select, Space } from "antd";
import { FormInstance } from "antd/lib/form";
import { EmployeeStore } from "../../stores";
import { UserError } from "../../interfaces";
import { inject, observer } from "mobx-react";
import { Roles } from "../../const";
import { AlertMessage } from "../../components";
import { EmployeeEntityResponse } from "../../services/employee/employee.payload";

interface Props {
  employeeStore?: EmployeeStore;
}

interface States {
  upsertLoading: boolean;
  upsertError: UserError | null;
  visible: boolean;
  employee: EmployeeEntityResponse | null;
}

@inject("employeeStore")
@observer
export class EmployeeDetailDrawer extends Component<Props, States> {
  formRef = React.createRef<FormInstance>();

  constructor(props: Props) {
    super(props);
    this.state = {
      upsertLoading: false,
      upsertError: null,
      visible: false,
      employee: null,
    };
  }

  openDrawer = async (id?: number) => {
    if (id) {
      try {
        const employee = await this.props.employeeStore!.get(id);
        this.formRef.current?.setFieldsValue(employee.data);
        this.setState({ employee });
      } catch (e) {
        if (!(e instanceof UserError)) throw e;
        console.log(e);
        return;
      }
    }
    this.setState({ visible: true });
  };

  private onClose = () => {
    this.formRef.current?.resetFields();
    this.setState({
      upsertError: null,
      upsertLoading: false,
      visible: false,
      employee: null,
    });
  };

  private onUpsert = async (id: number | null) => {
    this.setState({ upsertError: null, upsertLoading: true });
    try {
      const formData = await this.formRef.current?.validateFields();
      await this.props.employeeStore!.upsert(id, formData as any);
      this.onClose();
    } catch (e) {
      this.setState({ upsertLoading: false });
      if (!(e instanceof UserError)) throw e;
      this.setState({ upsertError: e });
    }
  };

  render() {
    const employee = this.state.employee?.data;
    return (
      <Drawer
        title={
          employee
            ? `Employee ${employee.username} - ${employee.role}`
            : "Create a new Employee"
        }
        width={420}
        forceRender={true}
        visible={this.state.visible}
        afterVisibleChange={(visible) => {
          if (!visible) this.onClose();
        }}
        closable={false}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Space>
              <Button
                disabled={this.state.upsertLoading}
                onClick={() => this.setState({ visible: false })}
              >
                Cancel
              </Button>

              <Button
                disabled={this.state.upsertLoading}
                loading={this.state.upsertLoading}
                onClick={() => {
                  this.onUpsert(employee?.id ?? null);
                }}
                type="primary"
              >
                {employee ? "Update" : "Create"}
              </Button>
            </Space>
          </div>
        }
      >
        <Form
          ref={this.formRef}
          labelAlign="left"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          {this.state.upsertError ? (
            <Alert
              message={
                <AlertMessage message={this.state.upsertError.message} />
              }
              type="error"
              style={{ marginBottom: "16px" }}
              showIcon
            />
          ) : null}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select placeholder="Select a role">
              {Roles.map((e) => (
                <Select.Option value={e} key={e}>
                  {e}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={
              employee
                ? []
                : [{ required: true, message: "Please input the Password!" }]
            }
          >
            <Input
              type="password"
              placeholder={employee ? "(Unchanged)" : "Password"}
            />
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}
