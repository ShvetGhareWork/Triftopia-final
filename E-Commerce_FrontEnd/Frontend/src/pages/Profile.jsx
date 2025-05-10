"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Editprofile from "../components/Editprofile.jsx";

// Mock user data
const initialUserData = {
  name: "",
  email: "",
  bio: "",
  profileImage: "",
};

export default function Profile() {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const handleUpdateUser = (updatedData) => {
    setUserData({ ...userData, ...updatedData });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      {/* Blur effect when popup is shown */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-4 w-full max-w-sm mx-auto"
          >
            <h2 className="text-xl font-bold text-center">Welcome!</h2>
            <p className="text-gray-300 text-center">
              Click below to edit your profile.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowPopup(false);
                  setIsEditing(true);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden z-30 text-white"
      >
        {/* Profile Header */}
        <div className="h-24 sm:h-32 bg-gradient-to-r from-gray-700 to-black"></div>

        {/* Profile Image */}
        <div className="relative">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            src={userData.profileImage || "https://via.placeholder.com/150"}
            alt={userData.name}
            className="h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-full border-4 border-gray-700 shadow-md -mt-12 sm:-mt-16 ml-4 sm:ml-6"
          />
          {/* Edit Button */}
          <div className="absolute top-0 right-0 m-2 sm:m-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Name and Email */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
            {userData.name || "Your Name"}
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            {userData.email || "your.email@example.com"}
          </p>

          {/* Bio */}
          <div>
            <h3 className="text-md sm:text-lg font-semibold text-gray-300">
              Bio
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              {userData.bio || "Tell us something about yourself..."}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Edit Profile Dialog */}
      <Editprofile
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        userData={userData}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
}
