import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
export async function POST() {
  const mockLeads = [{ instagram_user_id: '17841', username: 'markus_42_familie', full_name: 'Markus S.', age: 42, children: 2, interests: ['Finanzbildung'], match_score: 94, status: 'new' }]
  const { data } = await supabaseAdmin.from('leads').insert(mockLeads).select()
  return NextResponse.json({ leads: data })
}
