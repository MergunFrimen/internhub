import { useEffect } from "react";
import { JobPostingsFilters, PaginationParams, SortingParams } from "./useJobPostings";

export function useSearchResults(
    filters: JobPostingsFilters,
    pagination: PaginationParams,
    sorting: SortingParams,
    refetch: () => Promise<any>
  ) {
    // Debounce search
    useEffect(() => {
      const timer = setTimeout(async () => {
        await refetch();
      }, 300);
  
      return () => clearTimeout(timer);
    }, [filters, sorting, pagination, refetch]);
  }