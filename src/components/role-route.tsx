import React, { Component } from "react";
import { Route, RouteProps, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { AuthStore } from "../stores";
import { RoleEnum } from "../enum";
import { Result, Button } from "antd";

interface Props extends RouteProps {
  authStore?: AuthStore;
  roles: RoleEnum[];
}

@inject("authStore")
@observer
export class RoleRoute extends Component<Props> {
  render() {
    const { children, authStore, roles, ...rest } = this.props;
    const { auth } = authStore!;
    return (
      <Route
        {...rest}
        render={({ location }) =>
          roles.includes(auth?.role!) ? (
            children
          ) : (
            <Result
              status="403"
              title="403"
              subTitle="Sorry, you are not authorized to access this page."
              extra={
                <Link to={{ pathname: "/", state: { from: location } }}>
                  <Button type="primary">Go to Dashboard</Button>
                </Link>
              }
            />
          )
        }
      />
    );
  }
}
