"use client";

import { useState } from "react";
import { Menu, Layout, Button } from "antd";
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
  CloseOutlined,
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

const SQLSidebar = ({
  collapsed,
  onCollapse,
  isMobile,
  sidebarVisible,
  onClose,
}) => {
  const [openKeys, setOpenKeys] = useState(["query-basics", "functions"]);
  const [selectedKeys, setSelectedKeys] = useState(["select-statement"]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState(null);

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const onClick = ({ key }) => {
    setSelectedKeys([key]);

    // Close mobile sidebar when item is clicked
    if (isMobile && onClose) {
      onClose();
    }

    // Show learning modal for SQL topics
    const learningTopics = [
      // Query Basics
      "select-statement",
      "insert-statement",
      "update-statement",
      "delete-statement",
      "where-clause",
      // Query Filtering
      "operators",
      "order-by",
      "like",
      "in",
      "between",
      "join",
      "union",
      "group-by",
      "having",
      "case",
      "distinct",
      "exists",
      "any-all",
      "ifnull",
      "null-values",
      "aliases",
      // Functions
      "count",
      "avg",
      "sum",
      "max",
      "min",
      "window-function-basics",
      "lag",
      "lead",
      "first-value",
      "last-value",
      "concat",
      "len",
      "upper",
      "lower",
      "rand",
      "round",
      "floor",
      "ceil",
      "current-timestamp",
      "year",
      "month",
      "day",
      // Tables
      "datatypes",
      "create-table",
      "drop-table",
      "alter-table",
      "constraints",
      "not-null",
      "unique",
      "primary-key",
      "foreign-key",
      "check",
      "default",
      "auto-increment",
      "index",
    ];
    if (learningTopics.includes(key)) {
      setModalTopic(key);
      setModalOpen(true);
    } else {
      console.log("Selected topic:", key);
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
      width={isMobile ? 280 : 300}
      collapsed={isMobile ? false : collapsed}
      onCollapse={!isMobile ? onCollapse : undefined}
      collapsible={!isMobile}
      theme="dark"
      className={`h-screen overflow-hidden border-l border-gray-800 shadow-lg sql-sidebar transition-transform duration-300 ${
        isMobile ? (sidebarVisible ? "translate-x-0" : "translate-x-full") : ""
      }`}
      style={{
        position: "fixed",
        height: "100vh",
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: "#0e1319",
        transform: isMobile
          ? sidebarVisible
            ? "translateX(0)"
            : "translateX(100%)"
          : "translateX(0)",
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo/Header */}
        <div className="p-4 border-b border-gray-700 bg-[#002140] relative">
          {/* Mobile Close Button */}
          {isMobile && (
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={onClose}
              className="absolute left-2 top-2 text-white hover:text-gray-300"
              size="small"
            />
          )}

          <div className="text-white text-lg font-bold text-center">
            {/* {collapsed ? "IKIU" : "آموزش SQL"} */}
            <div className="flex mx-auto items-center justify-center w-fit bg-[#002140]">
              <DynamicImage
                className="bg-[#002140] "
                src="/logo-ikiu-white.png"
                alt="IKIU"
                width={isMobile ? 80 : 100}
                height={isMobile ? 80 : 100}
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
