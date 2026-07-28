import { NextResponse } from 'next/server'

export async function GET() {
  const igId = "17841406331656186"
  const pageId = "1273762529149430"
  const igToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const pageToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN || process.env.INSTAGRAM_ACCESS_TOKEN

  const tests: any = {}

  // Test 1: Was kann der IG Token?
  try {
    const r = await fetch(`https://graph.instagram.com/v19.0/me?access_token=${igToken}`)
    tests.me_ig = await r.json()
  } catch(e:any){ tests.me_ig = { error: e.message } }

  // Test 2: Page Conversations - DAS IST DER WICHTIGE für DMs!
  try {
    const r = await fetch(`https://graph.facebook.com/v19.0/${pageId}/conversations?platform=instagram&access_token=${pageToken}`)
    tests.page_conversations = await r.json()
  } catch(e:any){ tests.page_conversations = { error: e.message } }

  // Test 3: IG Profil abrufen
  try {
    const r = await fetch(`https://graph.facebook.com/v19.0/${igId}?fields=username,profile_pic&access_token=${pageToken}`)
    tests.ig_profile = await r.json()
  } catch(e:any){ tests.ig_profile = { error: e.message } }

  return NextResponse.json({
    has_ig_token: !!igToken,
    has_fb_token: !!pageToken,
    ig_id: igId,
    page_id: pageId,
    token_len: igToken?.length || 0,
    tests
  })
}
