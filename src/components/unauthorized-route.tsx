import React, { Component } from "react";
import { Route, Redirect, RouteProps } from "react-router";
import { inject, observer } from "mobx-react";
import AuthStore from "../stores/auth.store";

@inject("authStore")
@observer
export class UnauthorizedRoute extends Component<
  RouteProps & { authStore?: AuthStore }
> {
  render() {
    const { children, authStore, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authStore!.auth ? (
            <Redirect to={{ pathname: "/", state: { from: location } }} />
          ) : (
            this.props.children
          )
        }
      />
    );
  }
}
