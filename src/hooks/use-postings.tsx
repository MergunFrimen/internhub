import { supabaseClient } from "@/lib/supabase-client";
import { useQuery } from "@tanstack/react-query";
import { type PostgrestError } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export type JobPosting = Database["public"]["Tables"]["job_postings"]["Row"];

export const sortFields = ["created_at", "title", "salary_min"] as const;
export const sortDirections = ["ascending", "descending"] as const;

export type SortField = (typeof sortFields)[number];
export type SortDirection = (typeof sortDirections)[number];

export interface JobPostingsFilters {
  field?: string;
  type?: string;
  search?: string;
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

export function useJobPostings({
  filters,
  pagination,
  sorting,
}: UseJobPostingsParams) {
  return useQuery<JobPostingsResponse, PostgrestError>({
    queryKey: ["jobPostings", filters, pagination, sorting],
    queryFn: async () => {
      try {
        let query = supabaseClient
          .from("job_postings")
          .select("*", { count: "exact" })
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
          data: data,
          count: count || 0,
          error: null,
        };
      } catch (error) {
        console.error("Error fetching job postings:", error);
        throw error;
      }
    },
  });
}
