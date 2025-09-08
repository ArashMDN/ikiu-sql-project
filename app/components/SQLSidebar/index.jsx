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
  DatabaseOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { sqlTopicsData } from "../../data/sqlTopics";
import SQLLearningModal from "../SQLLearningModal";
import DynamicImage from "../DynamicImage";

const { Sider } = Layout;

const iconMap = {
  "💻": <DatabaseOutlined />,
  "🏠": <HomeOutlined />,
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState(null);

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const onClick = ({ key }) => {
    setSelectedKeys([key]);

    // Handle navigation
    if (key === "practice") {
      window.location.href = "/practice";
    } else if (key === "home") {
      window.location.href = "/";
    } else {
      // Show learning modal for SQL statements
      const learningTopics = [
        "select-statement",
        "insert-statement",
        "update-statement",
        "delete-statement",
        "where-clause",
      ];
      if (learningTopics.includes(key)) {
        setModalTopic(key);
        setModalOpen(true);
      } else {
        console.log("Selected topic:", key);
      }
    }
  };

  const generateMenuItems = (items) => {
    return items.map((item) => {
      if (item.type === "special") {
        return {
          key: item.id,
          icon: iconMap[item.icon],
          label: item.title,
        };
      }

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
      className="h-screen overflow-hidden  border-l border-gray-800 shadow-lg sql-sidebar"
      style={{
        position: "fixed",
        height: "100vh",
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: "#0e1319",
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo/Header */}
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <div className="text-white text-lg font-bold text-center">
            {/* {collapsed ? "IKIU" : "آموزش SQL"} */}
            <div className="flex mx-auto items-center justify-center w-fit bg-gray-800">
              <DynamicImage
                className="bg-gray-800 "
                src="/logo-ikiu-white.png"
                alt="IKIU"
                width={100}
                height={100}
              />
            </div>
          </div>
          {/* {!collapsed && (
            <div className="text-gray-400 text-sm text-center mt-1">
              مرجع یادگیری
            </div>
          )} */}
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

      {/* Learning Modal */}
      <SQLLearningModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        topic={modalTopic}
      />
    </Sider>
  );
};

export default SQLSidebar;
