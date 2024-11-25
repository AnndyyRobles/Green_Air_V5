import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function UserProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-app-card rounded-lg p-6 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-app-text">Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-app-green text-app-black rounded-lg hover:bg-opacity-90 transition-colors"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FiUser className="text-app-green text-xl" />
          <div>
            <p className="text-sm text-app-text/70">Username</p>
            <p className="text-lg font-semibold text-white">{user.username}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <FiMail className="text-app-green text-xl" />
          <div>
            <p className="text-sm text-app-text/70">Email</p>
            <p className="text-lg font-semibold text-white">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <FiPhone className="text-app-green text-xl" />
          <div>
            <p className="text-sm text-app-text/70">Phone</p>
            <p className="text-lg font-semibold text-white">{user.phone}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <FiMapPin className="text-app-green text-xl" />
          <div>
            <p className="text-sm text-app-text/70">Address</p>
            <p className="text-lg font-semibold text-white">{user.address}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}