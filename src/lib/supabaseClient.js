import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ahszarlfbkitjtliajln.supabase.co';
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_aB8mXBQiZEINyWW6o1SnkA_fu4DIDi-';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
export default supabase;
