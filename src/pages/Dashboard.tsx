
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

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Recent Uploads</h2>
          <div className="bg-card rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 text-center text-muted-foreground">
              No files have been uploaded yet.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
