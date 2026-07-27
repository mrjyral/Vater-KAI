import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  if(!code) return NextResponse.json({error:'No code'}, {status:400})
  const redirect = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`
  const tokenRes = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(redirect)}&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${code}`)
  const tokenData = await tokenRes.json()
  await supabaseAdmin.from('accounts').upsert({ access_token: tokenData.access_token })
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?connected=1`)
}
