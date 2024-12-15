import { useState } from "react";
import { JobPostingsFilters } from "./useJobPostings";

export function useSearchFilters() {
    const [filters, setFilters] = useState<JobPostingsFilters>({});
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleFilterChange = (field: string, value: string) => {
      setFilters((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  
    return {
      filters,
      handleSearchChange,
      handleFilterChange,
    };
  }