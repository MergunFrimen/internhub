import { useState } from "react";
import { SortingParams } from "./useJobPostings";

export function useSorting() {
    const [sorting, setSorting] = useState<SortingParams>({
      field: "created_at",
      direction: "descending",
    });
  
    const handleSortChange = (value: string) => {
      const [field, direction] = value.split("-");
      setSorting({
        field: field as SortingParams["field"],
        direction: direction as SortingParams["direction"],
      });
    };
  
    return {
      sorting,
      handleSortChange,
    };
  }