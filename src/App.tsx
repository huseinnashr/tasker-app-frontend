import "./App.css";
import React, { Fragment, Component } from "react";
import { Switch, Route } from "react-router-dom";
import { SignInPage, EmployeeListPage } from "./pages";
import { UnauthorizedRoute, AuthorizedRoute } from "./components";
import { Layout } from "antd";
import { AppNavbar, AppContent, AppFooter } from "./layout";
import { DashboardRoute } from "./components/dashboard-route";

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
                <DashboardRoute exact path="/" />
                <Route exact path="/admin/employee">
                  <EmployeeListPage />
                </Route>
              </AppContent>
              <AppFooter />
            </Layout>
          </AuthorizedRoute>
        </Switch>
      </Fragment>
    );
  }
}
