import React, { useEffect, useState, useCallback } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getCategories, getListingLocation } from "@/services/localtionService";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: {
    healthScore: string;
    category: string;
    location: string;
  };
  onFiltersChange: (filters: any) => void;
  setPageNumber: (num: number) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  setPageNumber,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [categories, setCategories] = useState<string[]>([]);
  const [listingLocation, setListingLocation] = useState<string[]>([]);

  // Create debounced function using useCallback to prevent recreation on every render
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearchChange(value);
      setPageNumber(1);
    }, 1000),
    [onSearchChange, setPageNumber]
  );

  // Update local state immediately for responsive UI
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    debouncedSearch(value);
  };
  // Cleanup function to cancel pending debounced calls
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Sync local state with prop changes (if searchTerm is controlled externally)
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      const listingLocation = await getListingLocation();
      setListingLocation(listingLocation);
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search listings by name, location, or category..."
            value={localSearchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={filters.healthScore}
            onValueChange={(value) => {
              onFiltersChange({ ...filters, healthScore: value });
              setPageNumber(1);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Health Score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all"> Health Scores</SelectItem>
              <SelectItem value="excellent">Excellent (90-100%)</SelectItem>
              <SelectItem value="good">Good (70-89%)</SelectItem>
              <SelectItem value="fair">Fair (50-69%)</SelectItem>
              <SelectItem value="poor">Poor (0-49%)</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.category}
            onValueChange={(value) => {
              onFiltersChange({ ...filters, category: value });
              setPageNumber(1);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.listingLocation}
            onValueChange={(value) => {
              onFiltersChange({ ...filters, location: value });
              setPageNumber(1);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {listingLocation.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* <Button variant="outline" size="sm">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            More Filters
          </Button> */}
        </div>
      </div>
    </div>
  );
};
