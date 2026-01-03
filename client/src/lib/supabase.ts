import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lbyultiyqugoevsofnia.supabase.co';
const supabaseKey = 'sb_publishable_WUKxfuQfWlKN9Sei5xfpoA_C_3-lS0t';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface SupaSnippet {
  id: number;
  title: string;
  language: string;
  code: string;
  created_at: string;
}
