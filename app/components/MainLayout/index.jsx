"use client";

import { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import SQLSidebar from "../SQLSidebar";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarVisible(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <Layout className="min-h-screen relative" hasSider>
      {/* Mobile Hamburger Menu */}
      {isMobile && (
        <div className="fixed top-3 right-3 z-[1001]">
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={toggleSidebar}
            className="shadow-lg rounded-lg h-10 w-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 border-none hover:from-blue-600 hover:to-blue-700"
            size="large"
          />
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && sidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
          onClick={closeSidebar}
        />
      )}

      <SQLSidebar
        collapsed={collapsed}
        onCollapse={onCollapse}
        isMobile={isMobile}
        sidebarVisible={sidebarVisible}
        onClose={closeSidebar}
      />

      <Layout
        className="transition-all duration-300"
        style={{
          marginRight: isMobile ? 0 : collapsed ? 80 : 300,
        }}
      >
        <Content
          className={`${
            isMobile ? "p-2 pt-4" : "p-6"
          } bg-gray-50 dark:bg-[#0e1319] min-h-screen flex justify-center`}
        >
          <div className="bg-white dark:bg-[#0e1319] rounded-lg shadow-sm min-h-full w-full max-w-full">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
