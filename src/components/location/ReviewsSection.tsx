
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ReviewsSectionProps {
  reviews: {
    averageRating: number;
    totalReviews: number;
    distribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const maxCount = Math.max(...Object.values(reviews.distribution));
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Review Summary</h3>
        <Badge variant="outline" className="text-xs">
          {reviews.totalReviews} reviews
        </Badge>
      </div>

      {/* Average Rating */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Star className="w-8 h-8 text-yellow-400 fill-current" />
          <span className="text-3xl font-bold text-gray-900">
            {reviews.averageRating || 'N/A'}
          </span>
        </div>
        <p className="text-sm text-gray-500">Average rating</p>
        {reviews.totalReviews > 0 && (
          <div className="flex items-center justify-center space-x-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600">Trending up</span>
          </div>
        )}
      </div>

      {/* Rating Distribution */}
      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = reviews.distribution[rating as keyof typeof reviews.distribution];
          const percentage = reviews.totalReviews > 0 ? (count / reviews.totalReviews) * 100 : 0;
          
          return (
            <div key={rating} className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 w-12">
                <span className="text-sm text-gray-600">{rating}</span>
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1">
                <Progress value={percentage} className="h-2" />
              </div>
              <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
            </div>
          );
        })}
      </div>

      {reviews.totalReviews === 0 && (
        <div className="text-center py-8">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">No reviews yet</p>
        </div>
      )}
    </Card>
  );
};
