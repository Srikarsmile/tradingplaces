import { createClient } from "@supabase/supabase-js";

// Get these from Supabase → Settings → API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://rijaetbhawrwbxoremna.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_5FNNLYQitBQllwLoTrJ09g_qSP4mLyP";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase configuration. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
