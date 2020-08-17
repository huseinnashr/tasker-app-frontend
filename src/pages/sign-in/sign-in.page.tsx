import "./sign-in.page.css";
import React, { Component } from "react";
import { Alert, Row, Col, Typography, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { inject } from "mobx-react";
import { AlertMessage } from "../../components";
import { AuthStore } from "../../stores";
import { RouterStore } from "mobx-react-router";
import { UserError } from "../../interfaces";

interface SignInPageProps {
  authStore?: AuthStore;
  routerStore?: RouterStore;
}

interface SignInPageState {
  signInError: UserError | null;
  signInLoading: boolean;
}

@inject("authStore", "routerStore")
export class SignInPage extends Component<SignInPageProps, SignInPageState> {
  constructor(props: SignInPageProps) {
    super(props);
    this.state = {
      signInError: null,
      signInLoading: false,
    };
  }

  onFinish = async (data: any) => {
    const { username, password } = data;
    this.setState({ signInError: null, signInLoading: true });
    try {
      await this.props.authStore!.signin(username, password);
    } catch (e) {
      if (!(e instanceof UserError)) throw e;
      this.setState({ signInError: e, signInLoading: false });
    }
  };

  render() {
    return (
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col xs={24} md={10} lg={8} xl={6} style={{ padding: "0px 16px" }}>
          <Row justify="center">
            <img
              src="/logo512.png"
              alt="logo"
              style={{ height: 46, marginRight: 4 }}
            ></img>
            <Typography.Title>Tasker App</Typography.Title>
          </Row>
          <Form onFinish={this.onFinish} className="login-form">
            {this.state.signInError ? (
              <Alert
                message={
                  <AlertMessage message={this.state.signInError.message} />
                }
                type="error"
                style={{ marginBottom: "16px" }}
                showIcon
              />
            ) : null}
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={this.state.signInLoading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}
