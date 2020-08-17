import React, { FC } from "react";
import { Layout } from "antd";
import { AppBreadcrumb } from "..";

export const AppContent: FC = ({ children }) => {
  return (
    <Layout.Content style={{ padding: "0px 50px" }}>
      <AppBreadcrumb />
      {children}
    </Layout.Content>
  );
};
