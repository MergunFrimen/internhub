import { supabaseClient } from "@/lib/supabase-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type PostgrestError } from "@supabase/supabase-js";
import { useEffect } from "react";
import { Database } from "@/types/supabase";

export type JobPosting = Database["public"]["Tables"]["job_postings"]["Row"] & {
  companies?: Database["public"]["Tables"]["companies"]["Row"];
};

export const sortFields = ["created_at", "title", "salary_min"] as const;
export const sortDirections = ["ascending", "descending"] as const;

export type SortField = (typeof sortFields)[number];
export type SortDirection = (typeof sortDirections)[number];

export interface JobPostingsFilters {
  field?: string;
  type?: string;
  search?: string;
  tags?: string[];
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SortingParams {
  field: SortField;
  direction: SortDirection;
}

export interface UseJobPostingsParams {
  filters?: JobPostingsFilters;
  pagination: PaginationParams;
  sorting: SortingParams;
}

export interface JobPostingsResponse {
  data: JobPosting[];
  count: number;
  error: PostgrestError | null;
}

async function fetchJobPostings({
  filters,
  pagination,
  sorting,
}: UseJobPostingsParams) {
  try {
    let query = supabaseClient
      .from("job_postings")
      .select("*, companies(*)", { count: "exact" })
      .is("deleted_at", null);

    if (filters) {
      if (filters.field) {
        query = query.eq("field", filters.field);
      }
      if (filters.type) {
        query = query.eq("type", filters.type);
      }
      if (filters.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
        );
      }
      // Add tag filtering
      if (filters.tags && filters.tags.length > 0) {
        query = query.contains("tags", filters.tags);
      }
    }

    // Apply sorting
    query = query.order(sorting.field, {
      ascending: sorting.direction === "ascending",
    });

    // Apply pagination
    const from = pagination.page * pagination.pageSize;
    const to = from + pagination.pageSize - 1;
    query = query.range(from, to);

    // Execute query
    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return {
      data: data || [],
      count: count || 0,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching job postings:", error);
    throw error;
  }
}

export function useJobPostings({
  filters,
  pagination,
  sorting,
}: UseJobPostingsParams) {
  const queryClient = useQueryClient();
  const queryKey = ["jobPostings", filters, pagination, sorting];

  const result = useQuery<JobPostingsResponse, PostgrestError>({
    queryKey,
    queryFn: () => fetchJobPostings({ filters, pagination, sorting }),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  // Prefetch next page
  const prefetchNextPage = async () => {
    const nextPage = pagination.page + 1;
    const totalPages = Math.ceil((result.data?.count || 0) / pagination.pageSize);

    if (nextPage < totalPages) {
      await queryClient.prefetchQuery({
        queryKey: ["jobPostings", filters, { ...pagination, page: nextPage }, sorting],
        queryFn: () =>
          fetchJobPostings({
            filters,
            pagination: { ...pagination, page: nextPage },
            sorting,
          }),
      });
    }
  };

  // Start prefetching when the current page data is loaded
  useEffect(() => {
    if (result.data) {
      prefetchNextPage();
    }
  }, [result.data, pagination.page]);

  return result;
}
