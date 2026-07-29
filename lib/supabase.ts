import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gwhlgjxkbgfqrgobqyvm.supabase.co/rest/v1/'
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aGxnanhrYmdmcXJnb2JxeXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNzc1NDgsImV4cCI6MjEwMDY1MzU0OH0.1_bKwOaHLoaQtdB43muQWt3qCjl6Nncb2Hh--R5UWBo'
const service = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aGxnanhrYmdmcXJnb2JxeXZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTA3NzU0OCwiZXhwIjoyMTAwNjUzNTQ4fQ.yJSvk_-cuX18ouSweRdqsmWWsJ76WtqO3UWfjVVleW8'

export const supabase = createClient(url, anon)
export const supabaseAdmin = createClient(url, service)
