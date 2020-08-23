import React, { Component } from "react";
import { Route, RouteProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { AuthStore } from "../stores";
import { RoleEnum } from "../enum";
import { AdminDashboard, ProjectDashboard } from "../pages";

interface Props extends RouteProps {
  authStore?: AuthStore;
}

@inject("authStore")
@observer
export class DashboardRoute extends Component<Props> {
  render() {
    const { children, authStore, ...rest } = this.props;
    const { auth } = authStore!;
    return (
      <Route
        {...rest}
        render={() =>
          auth?.role === RoleEnum.ADMIN ? (
            <AdminDashboard />
          ) : (
            <ProjectDashboard />
          )
        }
      />
    );
  }
}
