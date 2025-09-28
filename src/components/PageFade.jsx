"use client";
import { motion } from "framer-motion";
import { memo } from "react";

export const PageFade = memo(function PageFade({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
});
