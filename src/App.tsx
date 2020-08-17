import "./App.css";
import React, { Fragment, Component } from "react";
import { Switch } from "react-router-dom";
import { SignInPage, EmployeeListPage } from "./pages";
import { UnauthorizedRoute, AuthorizedRoute } from "./components";
import { Layout } from "antd";
import { AppNavbar, AppContent, AppFooter } from "./layout";

export class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <UnauthorizedRoute exact path="/signin">
            <SignInPage />
          </UnauthorizedRoute>
          <AuthorizedRoute path="/">
            <Layout>
              <AppNavbar />
              <AppContent>
                <EmployeeListPage />
              </AppContent>
              <AppFooter />
            </Layout>
          </AuthorizedRoute>
        </Switch>
      </Fragment>
    );
  }
}
