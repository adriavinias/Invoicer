export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Customer: {
        Row: {
          city: string
          country: string
          email: string
          id: string
          name: string | null
          postal_code: string
          street: string | null
          surname: string | null
          telephone: string
          updatedAt: string
          vatnif: string
        }
        Insert: {
          city: string
          country: string
          email: string
          id: string
          name?: string | null
          postal_code: string
          street?: string | null
          surname?: string | null
          telephone: string
          updatedAt: string
          vatnif: string
        }
        Update: {
          city?: string
          country?: string
          email?: string
          id?: string
          name?: string | null
          postal_code?: string
          street?: string | null
          surname?: string | null
          telephone?: string
          updatedAt?: string
          vatnif?: string
        }
        Relationships: []
      }
      Invoice: {
        Row: {
          customerId: string
          dueDate: string | null
          id: string
          invoiceNumber: string
          issueDate: string
          status: string | null
          totalAmount: number
          updatedAt: string
          userId: string
        }
        Insert: {
          customerId: string
          dueDate?: string | null
          id: string
          invoiceNumber: string
          issueDate: string
          status?: string | null
          totalAmount: number
          updatedAt: string
          userId: string
        }
        Update: {
          customerId?: string
          dueDate?: string | null
          id?: string
          invoiceNumber?: string
          issueDate?: string
          status?: string | null
          totalAmount?: number
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Invoice_customerId_fkey"
            columns: ["customerId"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Invoice_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      User: {
        Row: {
          city: string | null
          country: string | null
          createdAt: string
          email: string | null
          emailVerified: string | null
          id: string
          image: string | null
          name: string | null
          postal_code: string | null
          street: string | null
          surname: string | null
          telephone: string | null
          updatedAt: string
          vatnif: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          id: string
          image?: string | null
          name?: string | null
          postal_code?: string | null
          street?: string | null
          surname?: string | null
          telephone?: string | null
          updatedAt: string
          vatnif?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          id?: string
          image?: string | null
          name?: string | null
          postal_code?: string | null
          street?: string | null
          surname?: string | null
          telephone?: string | null
          updatedAt?: string
          vatnif?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
