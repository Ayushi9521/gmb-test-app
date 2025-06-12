import React, { useEffect, useRef, useState } from "react";
import { ListingCard } from "./ListingCard"; // ✅ updated import
import { fetchListings } from "@/services/localtionService";
import { Skeleton } from "@/components/ui/skeleton";

interface ListingGridProps {
  activeKPI: string;
  searchTerm: string;
  filters: any;
}

const ListingCardSkeleton = () => (
  <div className="p-6 border bg-white border-gray-200 rounded-lg">
    {/* Skeleton card UI */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <Skeleton className="h-6 w-6 rounded" />
    </div>
    <div className="flex items-center justify-between mb-4">
      <div>
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-8 w-12" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
    <div className="mb-4">
      <Skeleton className="h-20 w-full" />
    </div>
    <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
      <Skeleton className="h-8 flex-1" />
      <Skeleton className="h-8 w-10" />
    </div>
  </div>
);

interface Listing {
  id: string;
  name: string;
  category: string;
  location: string;
  healthScore: number;
  insights: {
    desktopSearch: number;
    mobileSearch: number;
    mapViews: number;
    calls: number;
    photos: number;
  };
  reviews: {
    rating: number;
    count: number;
    recent: number;
  };
  rankings: {
    avgPosition: number;
    trending: "up" | "down" | "stable";
  };
}

export const ListingGrid: React.FC<ListingGridProps> = ({
  activeKPI,
  searchTerm,
  filters,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageLimit, setPageLimit] = useState(3);
  const [totalListings, setTotalListing] = useState(0);
  const [nextPageToken, setNextPageToken] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const getListing = async () => {
    setIsLoading(true);
    try {
      const res = await fetchListings({ page: pageNumber, limit: pageLimit });
      console.log(res, "fetched list of card");
      const listingsObj = res?.data?.data?.listings || {};
      const apiListings = Object.values(listingsObj);

      setNextPageToken(res?.data.data.nextPageToken);
      setTotalListing(res?.data.data.noOfListing);

      const enriched = enrichListings(apiListings);
      setListings(enriched);
    } catch (err) {
      console.error("Failed to fetch listings", err);
    } finally {
      setIsLoading(false);
    }
  };

  const nextPage = async () => {
    setIsLoading(true);
    try {
      const res = await fetchListings({
        page: nextPageToken,
        limit: pageLimit,
      });
      const listingsObj = res?.data?.data?.listings || {};
      const apiListings = Object.values(listingsObj);

      if (!res?.data?.data?.nextPageToken || apiListings.length === 0) {
        setHasMore(false);
      }

      setNextPageToken(res?.data?.data?.nextPageToken || null);
      const enriched = enrichListings(apiListings);
      setListings((prev) => [...prev, ...enriched]);
    } catch (err) {
      console.error("Failed to fetch next page listings", err);
    } finally {
      setIsLoading(false);
    }
  };

  const enrichListings = (apiListings: any[]) =>
    apiListings
      .filter(
        (item) =>
          item?.id &&
          item?.locationName &&
          item?.category &&
          item?.location &&
          typeof item.healthScore !== "undefined"
      )
      .map((item: any, index: number) => ({
        id: item.id,
        name: item.locationName,
        category: item.category,
        location: item.location,
        healthScore: parseInt(item.healthScore) || 0,
        insights: {
          desktopSearch: parseInt(item.insights?.desktopSearch) || 0,
          mobileSearch: parseInt(item.insights?.mobileSearch) || 0,
          mapViews: parseInt(item.insights?.mapViews) || 0,
          calls: parseInt(item.insights?.calls) || 0,
          photos: parseInt(item.insights?.photos) || 0,
        },
        reviews: {
          rating: parseFloat(item.reviews?.rating) || 0,
          count: parseInt(item.reviews?.count) || 0,
          recent: parseInt(item.reviews?.recent) || 0,
        },
        rankings: {
          avgPosition: Math.floor(Math.random() * 20),
          trending: ["up", "down", "stable"][index % 3],
        },
      }));

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      getListing();
      isFirstRender.current = false;
    }
  }, []);

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesHealth =
      filters.healthScore === "all" ||
      (filters.healthScore === "excellent" && listing.healthScore >= 90) ||
      (filters.healthScore === "good" &&
        listing.healthScore >= 70 &&
        listing.healthScore < 90) ||
      (filters.healthScore === "fair" &&
        listing.healthScore >= 50 &&
        listing.healthScore < 70) ||
      (filters.healthScore === "poor" && listing.healthScore < 50);

    const matchesCategory =
      filters.category === "all" ||
      listing.category.toLowerCase() === filters.category.toLowerCase();

    return matchesSearch && matchesHealth && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          GMB Listings ({totalListings})
        </h2>
        <div className="text-sm text-gray-500">Showing {activeKPI} data</div>
        {isLoading ? (
          <Skeleton className="h-4 w-24" />
        ) : (
          `Showing ${activeKPI} data`
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ListingCardSkeleton key={index} />
            ))
          : filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                activeKPI={activeKPI}
              />
            ))}
      </div>

      {hasMore && !isLoading && (
        <button onClick={nextPage} className="text-blue-600 hover:underline">
          More
        </button>
      )}
    </div>
  );
};
