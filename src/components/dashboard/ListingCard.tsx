import React, { useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import {
  Eye,
  Phone,
  Star,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react";
import { MiniChart } from "./MiniChart";

interface ListingCardProps {
  listing: any;
  activeKPI: string;
}
const ListingCard: React.FC<ListingCardProps> = ({ listing, activeKPI }) => {
  const navigate = useNavigate();

  // Memoize the health score color to prevent recalculation
  const healthScoreColor = useMemo(() => {
    const score = listing.healthScore;
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-blue-100 text-blue-800";
    if (score >= 50) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  }, [listing.healthScore]);

  // Memoize the health score label
  const healthScoreLabel = useMemo(() => {
    const score = listing.healthScore;
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Poor";
  }, [listing.healthScore]);

  // Memoize the trend icon to prevent recreation
  const trendIcon = useMemo(() => {
    const trend = listing.rankings?.trending;
    if (trend === "up")
      return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === "down")
      return <TrendingDown className="w-3 h-3 text-red-500" />;
    return <Minus className="w-3 h-3 text-gray-400" />;
  }, [listing.rankings?.trending]);

  // Memoize the navigation handler to prevent recreation
  const handleViewDetails = useCallback(() => {
    navigate(`/location/${listing.id}`);
  }, [navigate, listing.id]);

  // Memoize KPI content based on activeKPI and listing data
  const kpiContent = useMemo(() => {
    switch (activeKPI) {
      case "insights":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">
                    {Number(listing.insights?.desktopSearch || 0) +
                      Number(listing.insights?.mobileSearch || 0)}
                  </p>
                  <p className="text-xs text-gray-500">Total Views</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">
                    {listing.insights?.calls || 0}
                  </p>
                  <p className="text-xs text-gray-500">Calls</p>
                </div>
              </div>
            </div>
            <MiniChart
              data={[65, 78, 45, 89, 67, 92, 78]}
              type="line"
              color="blue"
            />
          </div>
        );
      case "reviews":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-lg font-semibold">
                  {listing.reviews?.rating || 0}
                </span>
                <span className="text-sm text-gray-500">
                  ({listing.reviews?.count || 0})
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">
                  {listing.reviews?.recent || 0}
                </span>
                <span className="text-xs text-gray-500">recent</span>
              </div>
            </div>
            <MiniChart
              data={[4.1, 4.0, 4.3, 4.2, 4.4, 4.1, 4.2]}
              type="area"
              color="yellow"
            />
          </div>
        );

      case "rankings":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  #{listing.rankings?.avgPosition || 0}
                </p>
                <p className="text-xs text-gray-500">Avg Position</p>
              </div>
              <div className="flex items-center space-x-1">
                {trendIcon}
                <span className="text-sm capitalize">
                  {listing.rankings?.trending || "stable"}
                </span>
              </div>
            </div>
            <MiniChart
              data={[15, 12, 8, 10, 6, 4, listing.rankings?.avgPosition || 0]}
              type="bar"
              color="purple"
            />
          </div>
        );

      default:
        return null;
    }
  }, [
    activeKPI,
    listing.insights,
    listing.reviews,
    listing.rankings,
    trendIcon,
  ]);

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {listing.locationName}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <Badge variant="outline" className="text-xs">
              {listing.category}
            </Badge>
            <span className="text-xs text-gray-500">{listing.location}</span>
          </div>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Health Score */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600">Health Score</p>
          <p className="text-2xl font-bold text-gray-900">
            {listing.healthScore}%
          </p>
        </div>
        <Badge className={`${healthScoreColor} border-0`}>
          {healthScoreLabel}
        </Badge>
      </div>

      {/* KPI Content */}
      <div className="mb-4">{kpiContent}</div>

      {/* Actions */}
      <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
        <Button size="sm" className="px-3">
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

// Custom comparison function for React.memo
const areEqual = (prevProps: ListingCardProps, nextProps: ListingCardProps) => {
  // Compare activeKPI
  if (prevProps.activeKPI !== nextProps.activeKPI) {
    return false;
  }

  // Compare listing object - shallow comparison of key properties
  const prevListing = prevProps.listing;
  const nextListing = nextProps.listing;

  if (prevListing === nextListing) {
    return true; // Same reference
  }

  // Compare key listing properties
  if (
    prevListing.id !== nextListing.id ||
    prevListing.name !== nextListing.name ||
    prevListing.category !== nextListing.category ||
    prevListing.location !== nextListing.location ||
    prevListing.healthScore !== nextListing.healthScore
  ) {
    return false;
  }

  // Compare insights
  const prevInsights = prevListing.insights || {};
  const nextInsights = nextListing.insights || {};
  if (
    prevInsights.desktopSearch !== nextInsights.desktopSearch ||
    prevInsights.mobileSearch !== nextInsights.mobileSearch ||
    prevInsights.calls !== nextInsights.calls
  ) {
    return false;
  }

  // Compare reviews
  const prevReviews = prevListing.reviews || {};
  const nextReviews = nextListing.reviews || {};
  if (
    prevReviews.rating !== nextReviews.rating ||
    prevReviews.count !== nextReviews.count ||
    prevReviews.recent !== nextReviews.recent
  ) {
    return false;
  }

  // Compare rankings
  const prevRankings = prevListing.rankings || {};
  const nextRankings = nextListing.rankings || {};
  if (
    prevRankings.avgPosition !== nextRankings.avgPosition ||
    prevRankings.trending !== nextRankings.trending
  ) {
    return false;
  }

  return true; // All comparisons passed
};

// Export the memoized component with custom comparison

export const ListingCardMemo = React.memo(ListingCard, areEqual);
export default ListingCardMemo;
export { ListingCardMemo as ListingCard };
