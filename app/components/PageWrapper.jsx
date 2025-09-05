"use client";
import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageWrapper = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(PageWrapper);
