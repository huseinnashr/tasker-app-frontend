import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { Router } from "react-router-dom";
import { AuthStorageService } from "./services/auth-storage";
import { AuthService } from "./services/auth";
import { EmployeeService } from "./services/employee";
import { ManagerService } from "./services/manager";
import { createBrowserHistory } from "history";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { EmployeeStore, AuthStore, ManagerStore } from "./stores";

const routerStore = new RouterStore();
const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routerStore);

const authStorage = new AuthStorageService();
const authService = new AuthService(authStorage);
const employeeService = new EmployeeService(authStorage);
const managerService = new ManagerService(authStorage);

const authStore = new AuthStore(authService, authStorage);
const employeeStore = new EmployeeStore(employeeService);
const managerStore = new ManagerStore(managerService);

ReactDOM.render(
  <React.StrictMode>
    <Provider {...{ routerStore, authStore, employeeStore, managerStore }}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
