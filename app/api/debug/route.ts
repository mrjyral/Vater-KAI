import { NextResponse } from 'next/server'

export async function GET() {
  const igId = "17841406331656186"
  const pageId = process.env.FACEBOOK_PAGE_ID || "1273762529149430"
  const igToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const fbToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN

  let igTest = null
  try {
    const r = await fetch(`https://graph.facebook.com/v19.0/${igId}/conversations?platform=instagram&access_token=${igToken}`)
    igTest = await r.json()
  } catch(e:any){ igTest = { error: e.message } }

  return NextResponse.json({
    has_ig_token: !!igToken,
    has_fb_token: !!fbToken,
    ig_id: igId,
    page_id: pageId,
    token_len: igToken?.length || 0,
    ig_api_test: igTest
  })
}
