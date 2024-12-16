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

  const handleFilterChange = (field: string, value: string | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFilters((prev) => ({
      ...prev,
      tags,
    }));
  };

  return {
    filters,
    handleSearchChange,
    handleFilterChange,
    handleTagsChange,
  };
}