"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useDarkMode } from "../utils/store";

const ToastWrapper = ({ font, children }) => {
  const isDarkMode = useDarkMode((state) => state.isDarkMode);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        stacked={true}
        draggable
        bodyClassName={`font-yekan text-sm ${font} `}
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
      />
      {children}
    </>
  );
};

export default ToastWrapper;
