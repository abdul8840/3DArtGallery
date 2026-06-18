import React from 'react';
import { formatDate } from '@utils/helpers';
import { IoCheckmarkCircle, IoEllipse } from 'react-icons/io5';

const OrderTimeline = ({ statusHistory = [], currentStatus }) => {
  const allStatuses = [
    'pending',
    'processing',
    'confirmed',
    'shipped',
    'delivered',
  ];

  const getStatusIndex = (status) => allStatuses.indexOf(status);
  const currentIndex = getStatusIndex(currentStatus);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-xl font-display font-bold text-gray-900 mb-6">
        Order Timeline
      </h3>

      <div className="space-y-6">
        {statusHistory.map((event, index) => {
          const statusIndex = getStatusIndex(event.status);
          const isCompleted = statusIndex <= currentIndex;
          const isCurrent = event.status === currentStatus;

          return (
            <div key={index} className="relative flex items-start">
              {/* Connector Line */}
              {index < statusHistory.length - 1 && (
                <div
                  className={`absolute left-4 top-10 w-0.5 h-full ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}

              {/* Icon */}
              <div className="relative flex-shrink-0">
                {isCompleted ? (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <IoCheckmarkCircle className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <IoEllipse className="w-3 h-3 text-gray-400" />
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute inset-0 animate-ping">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full opacity-75" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="ml-4 flex-1">
                <p
                  className={`font-semibold ${
                    isCurrent ? 'text-yellow-600' : 'text-gray-900'
                  }`}
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(event.timestamp, 'PPpp')}
                </p>
                {event.note && (
                  <p className="text-sm text-gray-600 mt-1">{event.note}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;