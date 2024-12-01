export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      companies: {
        Row: {
          address: string | null
          city: string | null
          created_at: string | null
          deleted_at: string | null
          employees_max: number | null
          employees_min: number | null
          external_id: string
          foundation: number | null
          id: string
          industry: string | null
          internship: boolean | null
          internship_date: string | null
          internship_type: string | null
          latitude: number | null
          longitude: number | null
          name: string
          open_positions: number | null
          rank: number | null
          turnover_max: number | null
          turnover_min: number | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          deleted_at?: string | null
          employees_max?: number | null
          employees_min?: number | null
          external_id: string
          foundation?: number | null
          id?: string
          industry?: string | null
          internship?: boolean | null
          internship_date?: string | null
          internship_type?: string | null
          latitude?: number | null
          longitude?: number | null
          name: string
          open_positions?: number | null
          rank?: number | null
          turnover_max?: number | null
          turnover_min?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          deleted_at?: string | null
          employees_max?: number | null
          employees_min?: number | null
          external_id?: string
          foundation?: number | null
          id?: string
          industry?: string | null
          internship?: boolean | null
          internship_date?: string | null
          internship_type?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          open_positions?: number | null
          rank?: number | null
          turnover_max?: number | null
          turnover_min?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string | null
          current: boolean | null
          degree: string
          deleted_at: string | null
          end_date: string | null
          field_of_study: string
          id: string
          institution: string
          profile_id: string | null
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current?: boolean | null
          degree: string
          deleted_at?: string | null
          end_date?: string | null
          field_of_study: string
          id?: string
          institution: string
          profile_id?: string | null
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current?: boolean | null
          degree?: string
          deleted_at?: string | null
          end_date?: string | null
          field_of_study?: string
          id?: string
          institution?: string
          profile_id?: string | null
          start_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string
          external_id: string
          field: string
          id: string
          requirements: string[] | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description: string
          external_id?: string
          field: string
          id?: string
          requirements?: string[] | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string
          external_id?: string
          field?: string
          id?: string
          requirements?: string[] | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      language_skills: {
        Row: {
          certification_date: string | null
          certification_expiry: string | null
          certification_name: string | null
          certification_url: string | null
          certified: boolean | null
          created_at: string | null
          deleted_at: string | null
          id: string
          language_name: string
          listening_level:
            | Database["public"]["Enums"]["language_proficiency"]
            | null
          proficiency: Database["public"]["Enums"]["language_proficiency"]
          profile_id: string | null
          reading_level:
            | Database["public"]["Enums"]["language_proficiency"]
            | null
          speaking_level:
            | Database["public"]["Enums"]["language_proficiency"]
            | null
          updated_at: string | null
          writing_level:
            | Database["public"]["Enums"]["language_proficiency"]
            | null
        }
        Insert: {
          certification_date?: string | null
          certification_expiry?: string | null
          certification_name?: string | null
          certification_url?: string | null
          certified?: boolean | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          language_name: string
          listening_level?:
            | Database["public"]["Enums"]["language_proficiency"]
            | null
          proficiency: Database["public"]["Enums"]["language_proficiency"]
          profile_id?: string | null
          reading_level?:
            | Database["public"]["Enums"]["language_proficiency"]
            | null
          speaking_level?:
            | Database["public"]["Enums"]["language_proficiency"]
            | null
          updated_at?: string | null
          writing_level?:
            | Database["public"]["Enums"]["language_proficiency"]
            | null
        }
        Update: {
          certification_date?: string | null
          certification_expiry?: string | null
          certification_name?: string | null
          certification_url?: string | null
          certified?: boolean | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          language_name?: string
          listening_level?:
            | Database["public"]["Enums"]["language_proficiency"]
            | null
          proficiency?: Database["public"]["Enums"]["language_proficiency"]
          profile_id?: string | null
          reading_level?:
            | Database["public"]["Enums"]["language_proficiency"]
            | null
          speaking_level?:
            | Database["public"]["Enums"]["language_proficiency"]
            | null
          updated_at?: string | null
          writing_level?:
            | Database["public"]["Enums"]["language_proficiency"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "language_skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          deleted_at: string | null
          id: string
          read: boolean
          receiver_id: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          read?: boolean
          receiver_id?: string
          sender_id?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          read?: boolean
          receiver_id?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          deleted_at: string | null
          id: string
          message: string
          metadata: Json | null
          priority: Database["public"]["Enums"]["notification_priority"]
          read: boolean | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          message: string
          metadata?: Json | null
          priority: Database["public"]["Enums"]["notification_priority"]
          read?: boolean | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          priority?: Database["public"]["Enums"]["notification_priority"]
          read?: boolean | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          city: string | null
          country: string | null
          created_at: string | null
          deleted_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          personal_page: string | null
          phone: string | null
          resume_url: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          personal_page?: string | null
          phone?: string | null
          resume_url?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          personal_page?: string | null
          phone?: string | null
          resume_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string | null
          end_date: string | null
          highlights: string[] | null
          id: string
          profile_id: string | null
          repository_url: string | null
          role: string | null
          start_date: string | null
          technologies: string[] | null
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          highlights?: string[] | null
          id?: string
          profile_id?: string | null
          repository_url?: string | null
          role?: string | null
          start_date?: string | null
          technologies?: string[] | null
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          highlights?: string[] | null
          id?: string
          profile_id?: string | null
          repository_url?: string | null
          role?: string | null
          start_date?: string | null
          technologies?: string[] | null
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      social_links: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          platform: Database["public"]["Enums"]["platform_type"]
          profile_id: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          platform: Database["public"]["Enums"]["platform_type"]
          profile_id?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          platform?: Database["public"]["Enums"]["platform_type"]
          profile_id?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_links_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      technical_skills: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          name: string
          proficiency: Database["public"]["Enums"]["skill_level"]
          profile_id: string | null
          updated_at: string | null
          years_experience: number | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          name: string
          proficiency: Database["public"]["Enums"]["skill_level"]
          profile_id?: string | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          name?: string
          proficiency?: Database["public"]["Enums"]["skill_level"]
          profile_id?: string | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "technical_skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      work_experience: {
        Row: {
          achievements: string[] | null
          company: string
          created_at: string | null
          current: boolean | null
          deleted_at: string | null
          description: string | null
          end_date: string | null
          id: string
          location: string | null
          position: string
          profile_id: string | null
          responsibilities: string[] | null
          start_date: string
          technologies_used: string[] | null
          updated_at: string | null
        }
        Insert: {
          achievements?: string[] | null
          company: string
          created_at?: string | null
          current?: boolean | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          position: string
          profile_id?: string | null
          responsibilities?: string[] | null
          start_date: string
          technologies_used?: string[] | null
          updated_at?: string | null
        }
        Update: {
          achievements?: string[] | null
          company?: string
          created_at?: string | null
          current?: boolean | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          position?: string
          profile_id?: string | null
          responsibilities?: string[] | null
          start_date?: string
          technologies_used?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_experience_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      language_proficiency: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "native"
      notification_priority: "urgent" | "high" | "normal" | "low"
      notification_type:
        | "application_status_change"
        | "interview_scheduled"
        | "interview_reminder"
        | "message_received"
        | "application_deadline"
        | "profile_incomplete"
        | "application_received"
        | "application_withdrawn"
        | "company_profile_update"
        | "internship_status_change"
      platform_type: "linkedin" | "facebook" | "twitter" | "github"
      skill_level: "beginner" | "intermediate" | "advanced" | "expert"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
