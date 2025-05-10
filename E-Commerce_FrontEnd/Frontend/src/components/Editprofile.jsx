"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";

export default function EditProfile({ isOpen, onClose, userData, onUpdate }) {
  const [formData, setFormData] = useState(userData);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
    if (previewImage) {
      updatedData.profileImage = previewImage;
    }
    onUpdate(updatedData);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 sm:p-6">
        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-lg">
          {/* Dialog Header */}
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-lg sm:text-xl font-semibold">Edit Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              {/* Close Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border bg-gray-200">
                  <img
                    src={previewImage || formData.profileImage}
                    alt={formData.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  {/* Camera Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <circle cx="12" cy="13" r="3"></circle>
                  </svg>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            {/* Form Fields */}
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
              { id: "bio", label: "Bio", type: "textarea" },
              { id: "address", label: "Address", type: "text" },
            ].map(({ id, label, type }) => (
              <div key={id} className="space-y-1">
                <label
                  htmlFor={id}
                  className="block font-medium text-gray-700 text-sm sm:text-base"
                >
                  {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    id={id}
                    name={id}
                    value={formData[id]}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[80px] sm:min-h-[100px] text-sm sm:text-base resize-none"
                  />
                ) : (
                  <input
                    id={id}
                    name={id}
                    type={type}
                    value={formData[id]}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                  />
                )}
              </div>
            ))}

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 sm:px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 sm:px-4 py-2 bg-primary text-black rounded-lg hover:bg-gray-500 border-black border-2 transition text-sm sm:text-base"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

// Prop types
EditProfile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    occupation: PropTypes.string.isRequired,
    joinDate: PropTypes.string,
    profileImage: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
