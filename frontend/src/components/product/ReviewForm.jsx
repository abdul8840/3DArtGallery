import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductReview } from '@store/slices/productSlice';
import Button from '@components/common/Button';
import { IoStar, IoStarOutline } from 'react-icons/io5';

const ReviewForm = ({ productId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) {
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        addProductReview({
          productId,
          reviewData: { rating, comment },
        })
      ).unwrap();
      setRating(0);
      setComment('');
    } catch (error) {
      // Error handled by slice
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-display font-bold text-gray-900">
        Write a Review
      </h3>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Rating *
        </label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              {star <= (hoverRating || rating) ? (
                <IoStar className="w-8 h-8 text-yellow-500" />
              ) : (
                <IoStarOutline className="w-8 h-8 text-gray-300" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Review *
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
          placeholder="Share your thoughts about this artwork..."
          required
        />
      </div>

      <Button type="submit" loading={loading} disabled={rating === 0 || !comment.trim()}>
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;