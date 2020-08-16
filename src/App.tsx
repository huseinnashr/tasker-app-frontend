import "./App.css";
import React, { Fragment } from "react";
import { Route } from "react-router";
import { SignInPage } from "./pages";

function App() {
  return (
    <Fragment>
      <Route exact path="/signin" component={SignInPage} />
    </Fragment>
  );
}

export default App;
