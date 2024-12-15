import { supabaseClient } from "@/lib/supabase-client";
import { useQuery } from "@tanstack/react-query";
import { JobPosting } from "@/hooks/useJobPostings";

export function useInternshipDetails(id: string ) {
  return useQuery<JobPosting>({
    queryKey: ["internship", id],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from("job_postings")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("Internship not found");
      }

      return data;
    },
  });
}