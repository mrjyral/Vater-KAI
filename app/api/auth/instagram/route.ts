import { NextResponse } from 'next/server'

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_APP_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`,
    scope: 'instagram_basic,instagram_manage_messages,instagram_manage_comments,pages_show_list,pages_messaging,pages_read_engagement,public_profile,business_management',
    response_type: 'code',
    state: 'vaterkai'
  })
  return NextResponse.redirect(`https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`)
}
