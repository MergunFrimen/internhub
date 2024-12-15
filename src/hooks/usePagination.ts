import { useState } from "react";
import { PaginationParams } from "./useJobPostings";

export function usePagination() {
    const [pagination, setPagination] = useState<PaginationParams>({
      page: 0,
      pageSize: 10,
    });
  
    const handlePageChange = (page: number) => {
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