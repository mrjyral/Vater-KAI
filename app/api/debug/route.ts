export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN!
  const igId = process.env.INSTAGRAM_BUSINESS_ID!
  const fbId = process.env.FACEBOOK_PAGE_ID!
  
  let igTest: any = null
  try {
    const url = `https://graph.facebook.com/v19.0/${igId}/conversations?platform=instagram&limit=2&access_token=${token}`
    const r = await fetch(url)
    igTest = await r.json()
  } catch (e: any) {
    igTest = { error: e?.message || 'fetch failed' }
  }

  return Response.json({
    has_ig_token: !!process.env.INSTAGRAM_ACCESS_TOKEN,
    has_fb_token: !!process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
    ig_id: igId,
    page_id: fbId,
    token_len: token?.length || 0,
    ig_api_test: igTest
  })
}
