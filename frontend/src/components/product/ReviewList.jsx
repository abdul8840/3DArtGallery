import React from 'react';
import { formatRelativeTime } from '@utils/helpers';
import { IoStar, IoStarOutline } from 'react-icons/io5';

const ReviewList = ({ reviews = [] }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold text-gray-900">{review.name}</h4>
              <p className="text-sm text-gray-500">
                {formatRelativeTime(review.createdAt)}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) =>
                i < review.rating ? (
                  <IoStar key={i} className="w-5 h-5 text-yellow-500" />
                ) : (
                  <IoStarOutline key={i} className="w-5 h-5 text-gray-300" />
                )
              )}
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;