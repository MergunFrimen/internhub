import { useState } from "react";
import { PaginationParams } from "./useJobPostings";

export function usePagination() {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    pageSize: 12,
  });

  const handlePageChange = (page: number) => {
    // Smoothly scroll to top when changing pages
    // window.scrollTo({ top: 0, behavior: "smooth" });
    setPagination((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination({
      page: 0, // Reset to first page when changing page size
      pageSize,
    });
  };

  return {
    pagination,
    handlePageChange,
    handlePageSizeChange,
  };
}
