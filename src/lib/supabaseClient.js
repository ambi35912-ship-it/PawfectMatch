import { createClient } from '@supabase/supabase-js';

// Supabase publishable keys are intentionally browser-visible and are secured
// by RLS. Environment values make deployments portable; these defaults keep the
// existing project functional until its Vercel variables are configured.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ahszarlfbkitjtliajln.supabase.co';
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_aB8mXBQiZEINyWW6o1SnkA_fu4DIDi-';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
export default supabase;
