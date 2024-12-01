import { supabase } from "@/lib/supabase";
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
  location?: string;
  experience_level?: string;
  salary_min?: number;
  salary_max?: number;
  tags?: string[];
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
        let query = supabase
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
          if (filters.location) {
            query = query.ilike("location", `%${filters.location}%`);
          }
          if (filters.experience_level) {
            query = query.eq("experience_level", filters.experience_level);
          }
          if (filters.salary_min) {
            query = query.gte("salary_min", filters.salary_min);
          }
          if (filters.salary_max) {
            query = query.lte("salary_max", filters.salary_max);
          }
          if (filters.tags && filters.tags.length > 0) {
            query = query.contains("tags", filters.tags);
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
