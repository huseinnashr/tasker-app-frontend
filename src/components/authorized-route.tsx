import React, { Component } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { AuthStore } from "../stores";

interface Props extends RouteProps {
  authStore?: AuthStore;
}

@inject("authStore")
@observer
export class AuthorizedRoute extends Component<Props> {
  render() {
    const { children, authStore, ...rest } = this.props;
    const { auth } = authStore!;
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect to={{ pathname: "/signin", state: { from: location } }} />
          )
        }
      />
    );
  }
}
