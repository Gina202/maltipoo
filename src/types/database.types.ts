export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          id: string
          question: string
          sort_order: number | null
        }
        Insert: {
          answer: string
          id?: string
          question: string
          sort_order?: number | null
        }
        Update: {
          answer?: string
          id?: string
          question?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          puppy_slug: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          puppy_slug?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          puppy_slug?: string | null
        }
        Relationships: []
      }
      parent_images: {
        Row: {
          id: string
          parent_id: string | null
          sort_order: number | null
          url: string
        }
        Insert: {
          id?: string
          parent_id?: string | null
          sort_order?: number | null
          url: string
        }
        Update: {
          id?: string
          parent_id?: string | null
          sort_order?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "parent_images_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
        ]
      }
      parents: {
        Row: {
          breed: string
          created_at: string | null
          description: string | null
          gender: string | null
          health_info: string | null
          id: string
          main_image_url: string | null
          name: string
          slug: string
          temperament: string | null
          updated_at: string | null
          weight_lbs: number | null
        }
        Insert: {
          breed?: string
          created_at?: string | null
          description?: string | null
          gender?: string | null
          health_info?: string | null
          id?: string
          main_image_url?: string | null
          name: string
          slug: string
          temperament?: string | null
          updated_at?: string | null
          weight_lbs?: number | null
        }
        Update: {
          breed?: string
          created_at?: string | null
          description?: string | null
          gender?: string | null
          health_info?: string | null
          id?: string
          main_image_url?: string | null
          name?: string
          slug?: string
          temperament?: string | null
          updated_at?: string | null
          weight_lbs?: number | null
        }
        Relationships: []
      }
      puppies: {
        Row: {
          age_weeks: number | null
          created_at: string | null
          description: string | null
          expected_adult_weight: number | null
          father_id: string | null
          gender: string | null
          health_info: string | null
          id: string
          main_image_url: string | null
          mother_id: string | null
          name: string
          personality: string | null
          price: number
          ready_date: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string | null
          updated_at: string | null
          vaccination_status: string | null
        }
        Insert: {
          age_weeks?: number | null
          created_at?: string | null
          description?: string | null
          expected_adult_weight?: number | null
          father_id?: string | null
          gender?: string | null
          health_info?: string | null
          id?: string
          main_image_url?: string | null
          mother_id?: string | null
          name: string
          personality?: string | null
          price: number
          ready_date?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string | null
          updated_at?: string | null
          vaccination_status?: string | null
        }
        Update: {
          age_weeks?: number | null
          created_at?: string | null
          description?: string | null
          expected_adult_weight?: number | null
          father_id?: string | null
          gender?: string | null
          health_info?: string | null
          id?: string
          main_image_url?: string | null
          mother_id?: string | null
          name?: string
          personality?: string | null
          price?: number
          ready_date?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string | null
          updated_at?: string | null
          vaccination_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "puppies_father_id_fkey"
            columns: ["father_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "puppies_mother_id_fkey"
            columns: ["mother_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
        ]
      }
      puppy_images: {
        Row: {
          id: string
          puppy_id: string | null
          sort_order: number | null
          url: string
        }
        Insert: {
          id?: string
          puppy_id?: string | null
          sort_order?: number | null
          url: string
        }
        Update: {
          id?: string
          puppy_id?: string | null
          sort_order?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "puppy_images_puppy_id_fkey"
            columns: ["puppy_id"]
            isOneToOne: false
            referencedRelation: "puppies"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          address: string | null
          business_hours: string | null
          email: string | null
          id: number
          phone: string | null
          smartsupp_key: string | null
        }
        Insert: {
          address?: string | null
          business_hours?: string | null
          email?: string | null
          id?: number
          phone?: string | null
          smartsupp_key?: string | null
        }
        Update: {
          address?: string | null
          business_hours?: string | null
          email?: string | null
          id?: number
          phone?: string | null
          smartsupp_key?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string | null
          customer_name: string
          customer_photo_url: string | null
          id: string
          puppy_photo_url: string | null
          rating: number | null
          review: string
        }
        Insert: {
          created_at?: string | null
          customer_name: string
          customer_photo_url?: string | null
          id?: string
          puppy_photo_url?: string | null
          rating?: number | null
          review: string
        }
        Update: {
          created_at?: string | null
          customer_name?: string
          customer_photo_url?: string | null
          id?: string
          puppy_photo_url?: string | null
          rating?: number | null
          review?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
