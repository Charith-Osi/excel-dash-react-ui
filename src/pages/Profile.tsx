
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

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
        <p className="text-muted-foreground mb-8">Manage your account</p>

        <div className="max-w-3xl bg-card p-6 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row gap-6 items-center mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-muted">
              <img
                src={user?.avatar || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
              <p className="text-muted-foreground">{user?.email || "user@example.com"}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name || ""}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email || ""}
                    className="w-full p-2 border rounded-md"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded-md"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded-md"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded-md"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
