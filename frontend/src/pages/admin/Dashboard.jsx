import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import {
  IoCartOutline,
  IoPersonOutline,
  IoCubeOutline,
  IoTrendingUpOutline,
} from 'react-icons/io5';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const stats = [
    {
      title: 'Total Orders',
      value: '156',
      change: '+12%',
      icon: IoCartOutline,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Users',
      value: '2,345',
      change: '+8%',
      icon: IoPersonOutline,
      color: 'bg-green-500',
    },
    {
      title: 'Total Products',
      value: '89',
      change: '+5%',
      icon: IoCubeOutline,
      color: 'bg-purple-500',
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+23%',
      icon: IoTrendingUpOutline,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your virtual art gallery
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-600 text-sm font-semibold">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <QuickActionCard
                title="Manage Products"
                description="Add, edit, or remove artworks"
                onClick={() => navigate('/admin/products')}
              />
              <QuickActionCard
                title="Manage Orders"
                description="View and update order status"
                onClick={() => navigate('/admin/orders')}
              />
              <QuickActionCard
                title="Manage Users"
                description="View and manage users"
                onClick={() => navigate('/admin/users')}
              />
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="font-semibold text-yellow-900 mb-2">
              📝 Note: Admin Dashboard
            </h3>
            <p className="text-yellow-800 text-sm">
              This is a basic admin dashboard. For a production application, you would
              implement detailed analytics, product management tables, order
              management, user management, and more advanced features. The backend
              routes are already prepared for these operations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const QuickActionCard = ({ title, description, onClick }) => (
  <button
    onClick={onClick}
    className="bg-gray-50 hover:bg-gray-100 rounded-lg p-6 text-left transition-all border-2 border-transparent hover:border-yellow-500"
  >
    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </button>
);

export default Dashboard;