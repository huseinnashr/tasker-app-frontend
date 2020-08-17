import React, { Component } from "react";
import { Button, Form, Input, Drawer, Alert, Select } from "antd";
import { FormInstance } from "antd/lib/form";
import { EmployeeStore } from "../../stores";
import { UserError } from "../../interfaces";
import { inject } from "mobx-react";
import { Roles } from "../../const";
import { AlertMessage } from "../../components";
import { CreateEmployeeDTO } from "../../services/employee/employee.payload";

interface Props {
  employeeStore?: EmployeeStore;
}

interface States {
  createLoading: boolean;
  createError: UserError | null;
  visible: boolean;
}

@inject("employeeStore")
export class EmployeeCreateDrawer extends Component<Props, States> {
  formRef = React.createRef<FormInstance>();

  constructor(props: Props) {
    super(props);
    this.state = {
      createLoading: false,
      createError: null,
      visible: false,
    };
  }

  openDrawer = () => {
    this.setState({ visible: true });
  };

  private onClose = () => {
    this.formRef.current?.resetFields();
    this.setState({ createError: null, createLoading: false, visible: false });
  };

  private onCreate = async () => {
    this.setState({ createError: null, createLoading: true });
    try {
      const formData = await this.formRef.current?.validateFields();
      await this.props.employeeStore!.create(formData as CreateEmployeeDTO);
      this.onClose();
    } catch (e) {
      this.setState({ createLoading: false });
      if (!(e instanceof UserError)) throw e;
      if (e.willUnmount) return;
      this.setState({ createError: e });
    }
  };

  render() {
    return (
      <Drawer
        title={"Create a new Employee"}
        width={420}
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
            <Button
              disabled={this.state.createLoading}
              onClick={() => this.setState({ visible: false })}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button
              disabled={this.state.createLoading}
              loading={this.state.createLoading}
              onClick={this.onCreate}
              type="primary"
            >
              Create
            </Button>
            )
          </div>
        }
      >
        <Form
          ref={this.formRef}
          labelAlign="left"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          {this.state.createError ? (
            <Alert
              message={
                <AlertMessage message={this.state.createError.message} />
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
            rules={[{ required: true, message: "Please input the Password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}
