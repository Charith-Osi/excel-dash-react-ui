
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { LayoutDashboard, User, LogOut, Sun, Moon } from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

type SidebarItemProps = {
  icon: React.ReactNode;
  text?: string;
  isOpen: boolean;
  to: string;
  onClick?: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, isOpen, to, onClick }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-2 my-2 rounded-md cursor-pointer transition-all duration-300
        ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"}`
      }
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-10 h-10">{icon}</div>
      {isOpen && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          className="ml-2 whitespace-nowrap overflow-hidden"
        >
          {text}
        </motion.span>
      )}
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
    if (!isOpen) toggleSidebar();
  };

  const handleMouseLeave = () => {
    setHovering(false);
    if (isOpen) toggleSidebar();
  };

  return (
    <motion.div
      className="h-screen bg-sidebar fixed left-0 top-0 z-40 border-r border-sidebar-border"
      initial={{ width: isOpen ? "16rem" : "4rem" }}
      animate={{ width: isOpen ? "16rem" : "4rem" }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col h-full justify-between p-3">
        <div>
          <div className="flex items-center justify-center h-16 mb-6">
            {isOpen ? (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-bold text-sidebar-foreground"
              >
                Excel Dashboard
              </motion.h1>
            ) : (
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground font-bold">
                ED
              </div>
            )}
          </div>

          <nav>
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              isOpen={isOpen}
              to="/dashboard"
            />
            <SidebarItem
              icon={<User size={20} />}
              text="Profile"
              isOpen={isOpen}
              to="/profile"
            />
          </nav>
        </div>

        <div>
          <div className="sidebar-hr" />
          
          {/* Theme toggle */}
          <button 
            onClick={toggleTheme}
            className="flex items-center p-2 my-2 rounded-md cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent/50 w-full"
          >
            <div className="flex items-center justify-center w-10 h-10">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </div>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="ml-2 whitespace-nowrap overflow-hidden"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </motion.span>
            )}
          </button>
          
          {/* Logout */}
          <SidebarItem
            icon={<LogOut size={20} />}
            text="Logout"
            isOpen={isOpen}
            to="/login"
            onClick={logout}
          />
          
          {/* User profile */}
          {user && (
            <div className="flex items-center mt-4 p-2">
              <img 
                src={user.avatar || "/placeholder.svg"}
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="ml-2 whitespace-nowrap overflow-hidden"
                >
                  <div className="text-sm font-medium text-sidebar-foreground">{user.name}</div>
                  <div className="text-xs text-sidebar-foreground/60">{user.email}</div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
