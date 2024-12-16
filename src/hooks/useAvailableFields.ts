import { supabaseClient } from "@/lib/supabase-client";
import { useQuery } from "@tanstack/react-query";

export function useAvailableFields() {
    return useQuery({
      queryKey: ["fields"],
      queryFn: async () => {
        const { data, error } = await supabaseClient
          .from("job_postings")
          .select("field")
          .is("deleted_at", null);
  
        if (error) throw error;
  
        // Get unique fields and remove nulls
        const uniqueFields = [...new Set(data.map(item => item.field))]
          .filter(Boolean)
          .sort();
  
        return uniqueFields;
      },
    });
  }
  