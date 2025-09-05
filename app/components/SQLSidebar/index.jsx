"use client";

import { useState } from "react";
import { Menu, Layout } from "antd";
import {
  BookOutlined,
  SearchOutlined,
  FilterOutlined,
  FunctionOutlined,
  TableOutlined,
  TeamOutlined,
  RightOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { sqlTopicsData } from "../../data/sqlTopics";
import styles from "./SQLSidebar.module.css";

const { Sider } = Layout;

const iconMap = {
  "📚": <BookOutlined />,
  "🔍": <SearchOutlined />,
  "🔽": <FilterOutlined />,
  "⚙️": <FunctionOutlined />,
  "📊": <TableOutlined />,
  "🤝": <TeamOutlined />,
};

const SQLSidebar = ({ collapsed, onCollapse }) => {
  const [openKeys, setOpenKeys] = useState(["query-basics", "functions"]);
  const [selectedKeys, setSelectedKeys] = useState(["select-statement"]);

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const onClick = ({ key }) => {
    setSelectedKeys([key]);
    // Handle navigation here
    console.log("Selected:", key);
  };

  const generateMenuItems = (items) => {
    return items.map((item) => {
      if (item.type === "section") {
        return {
          key: item.id,
          icon: iconMap[item.icon],
          label: item.title,
          type: "group",
          children:
            item.children?.length > 0
              ? generateMenuItems(item.children)
              : undefined,
        };
      }

      if (item.type === "category") {
        return {
          key: item.id,
          icon: iconMap[item.icon],
          label: item.title,
          children:
            item.children?.length > 0
              ? generateMenuItems(item.children)
              : undefined,
        };
      }

      if (item.type === "subcategory") {
        return {
          key: item.id,
          label: item.title,
          children:
            item.children?.length > 0
              ? generateMenuItems(item.children)
              : undefined,
        };
      }

      // topic level
      return {
        key: item.id,
        label: item.title,
      };
    });
  };

  const menuItems = generateMenuItems(sqlTopicsData);

  return (
    <Sider
      width={300}
      collapsed={collapsed}
      onCollapse={onCollapse}
      collapsible
      theme="dark"
      className={`h-screen overflow-hidden shadow-lg ${styles.sqlSidebar}`}
      style={{
        position: "fixed",
        height: "100vh",
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: "#001529",
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo/Header */}
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <div className="text-white text-lg font-bold text-center">
            {collapsed ? "SQL" : "آموزش SQL"}
          </div>
          {!collapsed && (
            <div className="text-gray-400 text-sm text-center mt-1">
              مرجع یادگیری
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto">
          <Menu
            mode="inline"
            theme="dark"
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={onOpenChange}
            onClick={onClick}
            items={menuItems}
            className="border-r-0 h-full"
            style={{
              backgroundColor: "transparent",
              direction: "rtl",
            }}
            expandIcon={({ isOpen }) =>
              isOpen ? <DownOutlined /> : <RightOutlined />
            }
          />
        </div>
      </div>
    </Sider>
  );
};

export default SQLSidebar;
