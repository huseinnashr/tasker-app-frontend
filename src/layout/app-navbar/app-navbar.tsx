import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import AuthStore from "../../stores/auth.store";

interface AppNavbarProps {
  authStore?: AuthStore;
}

@inject("authStore")
@observer
export class AppNavbar extends Component<AppNavbarProps> {
  render() {
    const { authStore } = this.props;
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
          <Menu.Item key="admin-employee">
            <Link to="/admin/employee">Employee</Link>
          </Menu.Item>
          <Menu.SubMenu
            icon={<UserOutlined />}
            title={`${authStore!.auth?.username} - ${authStore!.auth?.role}`}
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
