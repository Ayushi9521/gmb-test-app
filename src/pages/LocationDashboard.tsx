import React, { useState } from "react";
import { LocationHeader } from "@/components/location/LocationHeader";
import { LocationKPIs } from "@/components/location/LocationKPIs";
import { ActivitySection } from "@/components/location/ActivitySection";
import { HealthScoreCard } from "@/components/location/HealthScoreCard";
import { InsightsSection } from "@/components/location/InsightsSection";
import { ReviewsSection } from "@/components/location/ReviewsSection";
import { PostsSection } from "@/components/location/PostsSection";
import { QASection } from "@/components/location/QASection";
import { doLogout } from "@/services/authService";
import { useNavigate, useParams } from "react-router-dom";

const LocationDashboard = () => {
  const { id } = useParams();
  const [timeRange, setTimeRange] = useState("30d");
  const [viewMode, setViewMode] = useState("overview");

  // Mock data - in real app this would come from API
  const locationData = {
    id: "431005",
    name: "Citation Builder Pro",
    category: "Digital Marketing Agency",
    address: "123 Business Ave, City, State 12345",
    healthScore: 79,
    lastUpdated: "2 hours ago",
    kpis: {
      totalPosts: 144,
      postsChange: 36,
      mediaPosts: 222,
      mediaChange: 12,
      reviewsResponded: 89,
      reviewsChange: 45,
      qaAnswered: 12,
      qaChange: 4,
    },
    insights: {
      websiteClicks: 6,
      directionsRequests: 61,
      phoneCallsClicked: 0,
      messagesReceived: 0,
      desktopSearchViews: 48,
      desktopMapsViews: 14,
      mobileSearchViews: 54,
      mobileMapsViews: 36,
    },
    reviews: {
      averageRating: 0,
      totalReviews: 91,
      distribution: {
        5: 66,
        4: 4,
        3: 0,
        2: 0,
        1: 1,
      },
    },
    posts: {
      live: 36,
      scheduled: 1,
      failed: 1,
    },
    progressData: {
      manual: 19.1,
      ai: 30.3,
      remaining: 50.6,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <LocationHeader
        location={locationData}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* KPIs Section */}
        <LocationKPIs kpis={locationData.kpis} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Charts & Activity */}
          <div className="xl:col-span-2 space-y-6">
            <ActivitySection timeRange={timeRange} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PostsSection posts={locationData.posts} />
              <InsightsSection insights={locationData.insights} />
            </div>
          </div>

          {/* Right Column - Health Score & Reviews */}
          <div className="space-y-6">
            <HealthScoreCard
              score={locationData.healthScore}
              suggestions={[
                {
                  type: "photos",
                  priority: "high",
                  description: "Add 5+ recent photos",
                },
                {
                  type: "hours",
                  priority: "medium",
                  description: "Update business hours",
                },
                {
                  type: "posts",
                  priority: "low",
                  description: "Publish weekly updates",
                },
              ]}
            />
            <ReviewsSection reviews={locationData.reviews} />
            <QASection qaData={{ answered: 12, pending: 3 }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocationDashboard;
