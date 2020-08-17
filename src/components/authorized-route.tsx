import React, { Component } from "react";
import { Route, Redirect, RouteProps } from "react-router";
import { inject, observer } from "mobx-react";
import AuthStore from "../stores/auth.store";

@inject("authStore")
@observer
export class AuthorizedRoute extends Component<
  RouteProps & { authStore?: AuthStore }
> {
  render() {
    const { children, authStore, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authStore!.auth ? (
            this.props.children
          ) : (
            <Redirect to={{ pathname: "/signin", state: { from: location } }} />
          )
        }
      />
    );
  }
}
