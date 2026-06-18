import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import ProfileInfo from '@components/profile/ProfileInfo';
import PasswordChange from '@components/profile/PasswordChange';
import { IoPersonOutline, IoLockClosedOutline, IoReceiptOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: IoPersonOutline },
    { id: 'password', label: 'Password', icon: IoLockClosedOutline },
    { id: 'orders', label: 'Orders', icon: IoReceiptOutline },
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'orders') {
      navigate('/orders');
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
              My Account
            </h1>
            <p className="text-gray-600">
              Manage your profile and account settings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                {/* User Info */}
                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                  <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl font-display font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-gray-900">
                    {user?.name}
                  </h2>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      user?.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </span>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                          activeTab === tab.id
                            ? 'bg-yellow-50 text-yellow-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'profile' && <ProfileInfo />}
                {activeTab === 'password' && <PasswordChange />}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;