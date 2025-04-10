
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <motion.main
        className="flex-1 overflow-auto"
        initial={{ marginLeft: "4rem" }}
        animate={{ marginLeft: isSidebarOpen ? "16rem" : "4rem" }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default Layout;
