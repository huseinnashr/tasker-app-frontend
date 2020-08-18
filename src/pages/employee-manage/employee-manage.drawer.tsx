import React, { Component } from "react";
import {
  Button,
  Form,
  Input,
  Drawer,
  Alert,
  Select,
  Space,
  Popconfirm,
  Spin,
} from "antd";
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
  drawerLoading: boolean;
  manageLoading: boolean;
  manageError: UserError | null;
  visible: boolean;
  employee: EmployeeEntityResponse | null;
}

@inject("employeeStore")
@observer
export class EmployeeManageDrawer extends Component<Props, States> {
  formRef = React.createRef<FormInstance>();

  constructor(props: Props) {
    super(props);
    this.state = {
      drawerLoading: false,
      manageLoading: false,
      manageError: null,
      visible: false,
      employee: null,
    };
  }

  openDrawer = async (id?: number) => {
    this.setState({ visible: true, drawerLoading: true });
    if (id) {
      try {
        const employee = await this.props.employeeStore!.get(id);
        this.formRef.current?.setFieldsValue(employee.data);
        this.setState({ employee });
      } catch (e) {
        if (!(e instanceof UserError)) throw e;
        this.onClose();
        return;
      }
    }
    this.setState({ drawerLoading: false });
  };

  private onClose = () => {
    this.formRef.current?.resetFields();
    this.setState({
      drawerLoading: false,
      manageError: null,
      manageLoading: false,
      visible: false,
      employee: null,
    });
  };

  private onUpsert = async (id: number | null) => {
    this.setState({ manageError: null, manageLoading: true });
    try {
      const formData = await this.formRef.current?.validateFields();
      await this.props.employeeStore!.upsert(id, formData as any);
      this.onClose();
    } catch (e) {
      this.setState({ manageLoading: false });
      if (!(e instanceof UserError)) throw e;
      this.setState({ manageError: e });
    }
  };

  private onDelete = async (id: number) => {
    this.setState({ manageError: null, manageLoading: true });
    try {
      await this.props.employeeStore!.delete(id);
      this.onClose();
    } catch (e) {
      this.setState({ manageLoading: false });
      if (!(e instanceof UserError)) throw e;
      this.setState({ manageError: e });
    }
  };

  render() {
    const employee = this.state.employee?.data;
    return (
      <Drawer
        title={
          <Spin spinning={this.state.drawerLoading}>
            {employee ? (
              <Space>
                <Popconfirm
                  placement="bottom"
                  title={"Are you sure want to delete this employee?"}
                  onConfirm={() => this.onDelete(employee.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    disabled={this.state.manageLoading}
                    loading={this.state.manageLoading}
                    type="primary"
                    danger
                  >
                    Delete
                  </Button>
                </Popconfirm>

                {`Employee ${employee.username} - ${employee.role}`}
              </Space>
            ) : (
              "Create a new Employee"
            )}
          </Spin>
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
          <Spin spinning={this.state.drawerLoading}>
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Space>
                <Button
                  disabled={this.state.manageLoading}
                  onClick={() => this.setState({ visible: false })}
                >
                  Cancel
                </Button>

                <Button
                  disabled={this.state.manageLoading}
                  loading={this.state.manageLoading}
                  onClick={() => {
                    this.onUpsert(employee?.id ?? null);
                  }}
                  type="primary"
                >
                  {employee ? "Update" : "Create"}
                </Button>
              </Space>
            </div>
          </Spin>
        }
      >
        <Spin spinning={this.state.drawerLoading}>
          <Form
            ref={this.formRef}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            {this.state.manageError ? (
              <Alert
                message={
                  <AlertMessage message={this.state.manageError.message} />
                }
                type="error"
                style={{ marginBottom: "16px" }}
                showIcon
              />
            ) : null}
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input the username!" },
              ]}
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
        </Spin>
      </Drawer>
    );
  }
}
