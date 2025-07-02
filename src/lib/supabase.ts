import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Generate a session ID for anonymous users
export const getSessionId = () => {
  let sessionId = localStorage.getItem('love_guru_session');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('love_guru_session', sessionId);
  }
  return sessionId;
};