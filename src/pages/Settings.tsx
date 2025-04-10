
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">Customize your experience</p>

        <div className="max-w-3xl space-y-8">
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Appearance</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark theme
                </p>
              </div>
              
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors"
              >
                {theme === "light" ? (
                  <>
                    <Sun className="h-5 w-5" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Notifications</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for important updates
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications in the browser
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Data Management</h3>
            
            <div className="space-y-6">
              <div>
                <p className="font-medium">Export All Data</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Download all your uploaded files and data
                </p>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                  Export Data
                </button>
              </div>
              
              <div>
                <p className="font-medium text-destructive">Danger Zone</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Permanently delete your account and all associated data
                </p>
                <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
