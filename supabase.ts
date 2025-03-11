import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://mqkxfohxehxzzhswvzmd.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xa3hmb2h4ZWh4enpoc3d2em1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNDUzMDIsImV4cCI6MjA1NjkyMTMwMn0.Q-SOQ7xeLKHA7f4TZ9a6dextbDYoJI2vOHiOqjb3zPw"


export const supabase = createClient(supabaseUrl,supabaseAnonKey)