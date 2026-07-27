import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
export async function POST(req: Request) {
  const { lead_id, body } = await req.json()
  await supabaseAdmin.from('messages').insert({ lead_id, direction: 'out', body })
  return NextResponse.json({ ok: true })
}
