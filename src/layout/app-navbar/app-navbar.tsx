import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import { AuthStore } from "../../stores";
import { RoleEnum } from "../../enum";

interface AppNavbarProps {
  authStore?: AuthStore;
}

@inject("authStore")
@observer
export class AppNavbar extends Component<AppNavbarProps> {
  render() {
    const { authStore } = this.props;
    const { auth } = authStore!;
    return (
      <Layout.Header className="header">
        <img
          src="/logo512.png"
          alt="logo"
          style={{
            height: "100%",
            padding: "12px 0px",
            marginRight: 16,
            float: "left",
          }}
        ></img>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item
            key="admin-employee"
            hidden={auth?.role !== RoleEnum.ADMIN}
            icon={<UsergroupAddOutlined />}
          >
            <Link to="/admin/employee">Employee</Link>
          </Menu.Item>
          <Menu.Item
            key="create-project"
            hidden={auth?.role !== RoleEnum.MANAGER}
            icon={<PlusOutlined />}
          >
            <Link to="/create-project">Create a Project</Link>
          </Menu.Item>
          <Menu.SubMenu
            icon={<UserOutlined />}
            title={`${auth?.username} - ${auth?.role}`}
            style={{ float: "right" }}
          >
            <Menu.Item key="setting">Setting</Menu.Item>
            <Menu.Item
              key="logout"
              onClick={() => {
                authStore!.signout();
              }}
            >
              Logout
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Header>
    );
  }
}
