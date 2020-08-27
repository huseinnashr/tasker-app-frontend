import React, { FC } from "react";
import { Layout } from "antd";

export const AppContent: FC = ({ children }) => {
  return (
    <Layout.Content style={{ padding: "36px 50px", backgroundColor: "white" }}>
      {children}
    </Layout.Content>
  );
};
