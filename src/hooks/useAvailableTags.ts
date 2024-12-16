import { supabaseClient } from "@/lib/supabase-client";
import { useQuery } from "@tanstack/react-query";

export function useAvailableTags() {
    return useQuery({
      queryKey: ["tags"],
      queryFn: async () => {
        const { data, error } = await supabaseClient
          .from("job_postings")
          .select("tags")
          .is("deleted_at", null);
  
        if (error) throw error;
  
        // Flatten array of arrays, get unique tags, and remove nulls
        const uniqueTags = [...new Set(data.flatMap(item => item.tags || []))]
          .filter(Boolean)
          .sort();
  
        return uniqueTags;
      },
    });
  }