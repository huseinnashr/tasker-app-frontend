import { Component } from "react";
import React from "react";
import { Col, Row, Avatar, Typography } from "antd";
import { inject, observer } from "mobx-react";
import { ManagerStore, AuthStore } from "../../stores";

interface Props {
  managerStore?: ManagerStore;
  authStore?: AuthStore;
}

interface States {
  managerLoading: boolean;
}

@inject("managerStore", "authStore")
@observer
export class ProjectDashboard extends Component<Props, States> {
  async componentDidMount() {
    this.setState({ managerLoading: true });
    const { auth } = this.props.authStore!;
    await this.props.managerStore!.get(auth!.id);
    this.setState({ managerLoading: false });
  }

  render() {
    const manager = this.props.managerStore!.manager?.data;
    return (
      <Row>
        <Col span={6}>
          <Avatar
            size={180}
            src={
              "http://localhost:3000/profile-picture/" + manager?.profilePicture
            }
          />
          <Typography.Title level={2}>
            {`${manager?.firstName} ${manager?.lastName} @${manager?.username}`}
          </Typography.Title>
          <Typography.Paragraph>
            <b>Email: </b>
            {manager?.email}
            <br />
            <b>Project Stats: </b>
            <br />
            <b>- Total: </b>
            {manager?.projectStats.total}
            <br />
            <b>- Completed: </b>
            {manager?.projectStats.completed}
          </Typography.Paragraph>
        </Col>
        <Col span={18}>Projects</Col>
      </Row>
    );
  }
}
