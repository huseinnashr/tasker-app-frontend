import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";

interface AppBreadcrumbProps {
  routerStore?: RouterStore;
}

@inject("routerStore")
@observer
export class AppBreadcrumb extends Component<AppBreadcrumbProps> {
  render() {
    const { location } = this.props.routerStore!;
    const paths = location.pathname.split("/");

    return (
      <Breadcrumb style={{ margin: "16px 0" }}>
        {paths.map((p, idx, arr) => {
          const fullPath = arr.slice(0, idx + 1).join("/");
          const title = p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();

          return (
            <Breadcrumb.Item key={p}>
              {idx < paths.length - 1 ? (
                <Link to={fullPath}>{idx === 0 ? "Home" : title}</Link>
              ) : (
                title
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  }
}
