import "./App.css";
import React, { Fragment, Component } from "react";
import { Switch } from "react-router-dom";
import { SignInPage, EmployeeListPage } from "./pages";
import { UnauthorizedRoute, AuthorizedRoute, RoleRoute } from "./components";
import { Layout } from "antd";
import { AppNavbar, AppContent, AppFooter } from "./layout";
import { DashboardRoute } from "./components/dashboard-route";
import { RoleEnum } from "./enum";

export class App extends Component {
  render() {
    const ADMIN = [RoleEnum.ADMIN];

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
                <DashboardRoute exact path="/" />
                <RoleRoute roles={ADMIN} exact path="/admin/employee">
                  <EmployeeListPage />
                </RoleRoute>
              </AppContent>
              <AppFooter />
            </Layout>
          </AuthorizedRoute>
        </Switch>
      </Fragment>
    );
  }
}
