"use client";
import "@ant-design/v5-patch-for-react-19";
import { useDarkMode } from "@/app/utils/store";
import { ConfigProvider, theme as antdTheme, App } from "antd";

const AntConfigProvider = ({ children }) => {
  const isDarkMode = useDarkMode((state) => state.isDarkMode);
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Yekan",
          colorPrimary: "#818CF8",
          colorBgContainer: isDarkMode ? "#24262b" : "#fff",
          colorBorder: "#2d2f35",
        },
        components: {
          Image: {
            rtl: true,
          },
          Input: {
            colorBgContainer: "#24262b",
            colorBorder: "#2d2f35",
            borderRadius: "8px",
          },
          Menu: {
            colorBgContainer: "#24262b",
            colorBorder: "#2d2f35",
            borderRadius: "8px",
          },
          Select: {
            borderRadius: "10px",
            colorBgContainer: "#24262b",
            colorBorder: "#2d2f35",
            borderRadius: "8px",
          },
          Tooltip: {},
        },

        algorithm:
          isDarkMode === true
            ? [antdTheme.darkAlgorithm]
            : [antdTheme.defaultAlgorithm],
      }}
      direction="rtl"
    >
      <App>{children}</App>
    </ConfigProvider>
  );
};

export default AntConfigProvider;
