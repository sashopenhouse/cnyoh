import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          source: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          source?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          source?: string | null;
        };
      };
    };
  };
};
