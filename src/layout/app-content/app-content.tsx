import React, { FC } from "react";
import { Layout } from "antd";

export const AppContent: FC = ({ children }) => {
  return (
    <Layout.Content style={{ padding: "0px 50px", backgroundColor: "white" }}>
      {children}
    </Layout.Content>
  );
};
