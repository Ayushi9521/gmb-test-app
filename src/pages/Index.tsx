import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import { SummaryStats } from "@/components/dashboard/SummaryStats";
import { KPIToggle } from "@/components/dashboard/KPIToggle";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { ListingGrid } from "@/components/dashboard/ListingGrid";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const Index = () => {
  const { user } = useAuth();

  // This hook connects the auth context with axios interceptors
  useAxiosAuth();
  const [activeKPI, setActiveKPI] = useState("insights");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    healthScore: "all",
    category: "all",
    location: "all",
  });
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Statistics */}
        <SummaryStats />

        {/* KPI Toggle */}
        <div className="mt-8">
          <KPIToggle activeKPI={activeKPI} onKPIChange={setActiveKPI} />
        </div>

        {/* Filter Bar */}
        <div className="mt-6">
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={selectedFilters}
            onFiltersChange={setSelectedFilters}
            setPageNumber={setPageNumber}
          />
        </div>

        {/* Listings Grid */}
        <div className="mt-8">
          <ListingGrid
            activeKPI={activeKPI}
            searchTerm={searchTerm}
            filters={selectedFilters}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
