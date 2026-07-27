import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gwhlgjxkbgfqrgobqyvm.supabase.co/rest/v1/', process.env.NEXT_PUBLIC_SUPABASE_AN
