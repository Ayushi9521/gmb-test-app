import axiosInstance from "@/api/axiosInstance";
// old code
// export const fetchListings = ({
//   page = 0,
//   limit = 9,
// }: { page?: number; limit?: number } = {}) => {
//   return axiosInstance.post("/v1/get-locations", { page, limit });
// };
// getting data
let cachedInitialData: any = null; // Cache only for page = 1

const fetchInitialData = async (
  page: number,
  limit: number,
  isInitial: boolean = false
) => {
  // Only cache and reuse if page === 1 AND it's a truly initial request (no filters/search)
  if (page === 1 && isInitial && !cachedInitialData) {
    const res = await axiosInstance.post("/v1/get-locations", { page, limit });
    cachedInitialData = res.data;
    // console.log("Fetched and cached initial location data", cachedInitialData);
    return cachedInitialData;
  } else if (page === 1 && isInitial && cachedInitialData) {
    // console.log("Using cached initial location data");
    return cachedInitialData;
  } else {
    // Don't use cache for filtered requests or other pages
    const res = await axiosInstance.post("/v1/get-locations", { page, limit });
    return res.data;
  }
};

export const fetchListings = async ({
  page = 1,
  limit = 9,
  searchTerm,
  healthScore,
  category,
  location,
  isInitial = false,
}) => {
  let minScore = undefined;
  let maxScore = undefined;

  switch (healthScore) {
    case "excellent":
      minScore = "90";
      maxScore = "100";
      break;
    case "good":
      minScore = "70";
      maxScore = "89";
      break;
    case "fair":
      minScore = "50";
      maxScore = "69";
      break;
    case "poor":
      minScore = "0";
      maxScore = "49";
      break;
    case "all":
      minScore = "0";
      maxScore = "100";
      break;
  }

  const queryParams = {
    page,
    limit,
    ...(searchTerm ? { search: searchTerm } : {}),
    ...(minScore ? { minScore } : {}),
    ...(maxScore ? { maxScore } : {}),
    ...(category ? { category } : {}),
    ...(location ? { location } : {}),
  };

  if (isInitial) {
    // return await fetchInitialData(page, limit);
    return await fetchInitialData(page, limit, true);
  } else {
    const res = await axiosInstance.post("/v1/get-locations", queryParams);
    console.log("Sending payload:", queryParams);
    return res.data;
  }
};

export const getCategories = async () => {
  try {
    const res = await fetchInitialData(1, 3, true);
    const listings = res?.data?.listings;

    if (listings && Array.isArray(listings)) {
      const categories = [
        ...new Set(
          listings.map(
            (item: any) => item.category?.toLowerCase() || "uncategorized"
          )
        ),
      ];
      return categories;
    }

    return [];
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
};

export const getListingLocation = async () => {
  try {
    const res = await fetchInitialData(1, 3, true);
    const listings = res?.data?.listings;

    if (listings && Array.isArray(listings)) {
      const location = [
        ...new Set(
          listings.map(
            (item: any) => item.location?.toLowerCase() || "uncategorized"
          )
        ),
      ];
      return location;
    }

    return [];
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
};

export const getListingsStats = async () => {
  const res = await axiosInstance.get("/v1/get-trend");
  // console.log("response from location service for getlisting", res);
  return res;
};
