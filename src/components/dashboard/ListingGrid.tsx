import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { ListingCard } from "./ListingCard"; // ✅ updated import
import { fetchListings } from "@/services/localtionService";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ListingGridProps {
  activeKPI: string;
  searchTerm: string;
  filters: any;
  pageNumber: number;
  setPageNumber: (value: number | ((prev: number) => number)) => void;
}

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

interface ItemProps {
  listing: Listing;
  activeKPI: string;
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

export const ListingGrid: React.FC<ListingGridProps> = ({
  activeKPI,
  searchTerm,
  filters,
  pageNumber,
  setPageNumber,
}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  // const [pageNumber, setPageNumber] = useState(0);
  const [pageLimit] = useState(3);

  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [previousPageNumber, setPreviousPageNumber] = useState(1);
  const [maxPageReached, setMaxPageReached] = useState(1);
  const getListing = useCallback(async () => {
    try {
      if (pageNumber === 1) {
        setIsInitialLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const isInitial =
        !searchTerm &&
        (!filters.healthScore || filters.healthScore === "all") &&
        (!filters.category || filters.category === "all") &&
        (!filters.location || filters.location === "all");
      // console.log("is initial val", isInitial);

      const res = await fetchListings({
        page: pageNumber,
        limit: pageLimit,
        searchTerm,
        healthScore: filters.healthScore || undefined,
        category: filters.category || undefined,
        location: filters.location || undefined,
        isInitial,
      });
      // console.log("fetched list of card", res.data);
      // console.log("Fetched page:", pageNumber);
      // console.log("Previous page was:", previousPageNumber);

      const listingsData = Array.isArray(res.data.data)
        ? res.data // in case it's just a list
        : res.data?.listings || [];

      // const listingsData = res.data?.listings || [];

      if (pageNumber === 1) {
        setListings(listingsData); // Reset list on new search/filter
        setMaxPageReached(1);
      } else if (pageNumber > previousPageNumber) {
        // Next button: append new listings
        // console.log("Next navigation: Appending listings");
        setListings((prev) => [...prev, ...listingsData]);
        setMaxPageReached(pageNumber);
      } else if (pageNumber < previousPageNumber) {
        // Previous button: remove last page worth of listings
        // console.log("Previous navigation: Removing last page");
        setListings((prev) => {
          const itemsPerPage = pageLimit;
          const itemsToShow = pageNumber * itemsPerPage;
          return prev.slice(0, itemsToShow);
        });
        // When going backward, check if we can go forward again
        setHasMore(pageNumber < maxPageReached);
      }

      // Update previous page number for next comparison
      setPreviousPageNumber(pageNumber);
      // setListings((prev) => [...prev, ...listingsData]);

      // setListings((prev) => [...prev, ...res.data.data.listings]);

      // Check if there are more pages (only update when fetching new data)
      if (pageNumber >= previousPageNumber || pageNumber === 1) {
        setHasMore(!!res.data.nextPageToken);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsInitialLoading(false);
      setIsLoadingMore(false);
    }
  }, [
    pageNumber,
    pageLimit,
    searchTerm,
    filters,
    previousPageNumber,
    maxPageReached,
  ]);

  useEffect(() => {
    getListing();
  }, [getListing]);

  // const filteredListings = listings.filter((listing) => {
  //   // console.log("Listing Data", listing);
  //   const matchesSearch =
  //     listing.locationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     listing.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     listing.location?.toLowerCase().includes(searchTerm.toLowerCase());

  //   const matchesHealth =
  //     filters.healthScore === "all" ||
  //     (filters.healthScore === "excellent" && listing.healthScore >= 90) ||
  //     (filters.healthScore === "good" &&
  //       listing.healthScore >= 70 &&
  //       listing.healthScore < 90) ||
  //     (filters.healthScore === "fair" &&
  //       listing.healthScore >= 50 &&
  //       listing.healthScore < 70) ||
  //     (filters.healthScore === "poor" && listing.healthScore < 50);

  //   const matchesCategory =
  //     filters.category === "all" ||
  //     listing.category.toLowerCase() === filters.category.toLowerCase();

  //   return matchesSearch && matchesHealth && matchesCategory;
  // });

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const handleNextPage = () => {
    if (hasMore) {
      setPageNumber(pageNumber + 1);
    }
  };
  // const handleLoadMore = () => {
  //   setPageNumber((prev) => prev + 1);
  // };

  // Memoized actual items
  //   const renderedItems = useMemo(() => {
  //     return listings.map((listing) => (
  //       <Item key={listing.id} listing={listing} />
  //     ));
  //   }, [listings]);

  // Memoized rendered listing cards
  const renderedItems = useMemo(() => {
    // console.log("listing data for cards", listings);
    return listings.map((listing) => (
      <ListingCard key={listing.id} listing={listing} activeKPI={activeKPI} />
    ));
  }, [listings, activeKPI]);

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            GMB Listings ({listings.length})
          </h2>
          <div className="text-sm text-gray-500">Showing {activeKPI} data</div>
          {isLoading ? (
            <Skeleton className="h-4 w-24" />
          ) : (
            `Showing ${activeKPI} data`
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {isInitialLoading &&
            [...Array(pageLimit)].map((_, i) => (
              <ListingCardSkeleton key={i} />
            ))}

          {/* Show actual cards */}
          {!isInitialLoading && renderedItems}

          {/* Show skeletons only for new loading */}
          {isLoadingMore &&
            [...Array(pageLimit)].map((_, i) => (
              <ListingCardSkeleton key={`load-more-${i}`} />
            ))}
        </div>
        {/* 
        {!isInitialLoading && hasMore && !isLoadingMore && (
          <button
            onClick={handleLoadMore}
            className="text-blue-600 hover:underline"
          >
            More
          </button>
        )} */}

        {/* Pagination Controls */}
        {!isInitialLoading && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePreviousPage}
                  className={
                    pageNumber === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink isActive>{pageNumber}</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={handleNextPage}
                  className={
                    !hasMore
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  );
};
