
import React from "react";
import { motion } from "framer-motion";
import FileUpload from "../components/FileUpload";

const Dashboard = () => {
  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Upload and analyze your Excel data</p>

        {/* Stats cards removed as requested */}

        <FileUpload />

        {/* Recent Uploads section removed as requested */}
      </motion.div>
    </div>
  );
};

export default Dashboard;
