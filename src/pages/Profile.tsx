
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground mb-8">Your account information</p>

        <div className="max-w-3xl bg-card p-6 rounded-lg shadow-sm">
          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-32 h-32 mb-4 bg-purple-500">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt="Profile" />
              <AvatarFallback className="bg-purple-500 text-white">{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
            <p className="text-muted-foreground">{user?.email || "user@example.com"}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
