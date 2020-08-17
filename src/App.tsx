import "./App.css";
import React, { Fragment, Component } from "react";
import { inject, observer } from "mobx-react";
import { Switch } from "react-router";
import { SignInPage, EmployeeListPage } from "./pages";
import { UnauthorizedRoute, AuthorizedRoute } from "./components";

@inject("routerStore")
@observer
export class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <UnauthorizedRoute exact path="/signin">
            <SignInPage />
          </UnauthorizedRoute>
          <AuthorizedRoute path="/">
            <EmployeeListPage />
          </AuthorizedRoute>
        </Switch>
      </Fragment>
    );
  }
}
