import "./App.css";
import React, { Fragment, Component } from "react";
import { inject, observer } from "mobx-react";
import { Route } from "react-router";
import { SignInPage } from "./pages";

@inject("routerStore")
@observer
export class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/signin" component={SignInPage} />
      </Fragment>
    );
  }
}
