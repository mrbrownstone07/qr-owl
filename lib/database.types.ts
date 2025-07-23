export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: 'free' | 'pro'
          subscription_status: string | null
          stripe_customer_id: string | null
          trial_ends_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'pro'
          subscription_status?: string | null
          stripe_customer_id?: string | null
          trial_ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'pro'
          subscription_status?: string | null
          stripe_customer_id?: string | null
          trial_ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      qr_codes: {
        Row: {
          id: string
          user_id: string
          title: string
          type: 'static' | 'dynamic'
          qr_type: string
          short_code: string
          destination_url: string
          original_data: any
          customization: any
          is_active: boolean
          scan_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          type: 'static' | 'dynamic'
          qr_type: string
          short_code: string
          destination_url: string
          original_data?: any
          customization?: any
          is_active?: boolean
          scan_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          type?: 'static' | 'dynamic'
          qr_type?: string
          short_code?: string
          destination_url?: string
          original_data?: any
          customization?: any
          is_active?: boolean
          scan_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      qr_scans: {
        Row: {
          id: string
          qr_code_id: string
          ip_address: string | null
          user_agent: string | null
          country: string | null
          city: string | null
          device_type: string | null
          browser: string | null
          os: string | null
          scanned_at: string
        }
        Insert: {
          id?: string
          qr_code_id: string
          ip_address?: string | null
          user_agent?: string | null
          country?: string | null
          city?: string | null
          device_type?: string | null
          browser?: string | null
          os?: string | null
          scanned_at?: string
        }
        Update: {
          id?: string
          qr_code_id?: string
          ip_address?: string | null
          user_agent?: string | null
          country?: string | null
          city?: string | null
          device_type?: string | null
          browser?: string | null
          os?: string | null
          scanned_at?: string
        }
      }
    }
  }
}