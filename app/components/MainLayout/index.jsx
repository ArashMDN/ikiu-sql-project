"use client";

import { useState } from "react";
import { Layout } from "antd";
import SQLSidebar from "../SQLSidebar";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout className="min-h-screen" hasSider>
      <SQLSidebar collapsed={collapsed} onCollapse={onCollapse} />

      <Layout
        className="transition-all duration-300"
        style={{
          marginRight: collapsed ? 80 : 300,
        }}
      >
        <Content className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 min-h-full">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
