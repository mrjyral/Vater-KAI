export async function GET() {
  return Response.json({
    has_ig_token: !!process.env.INSTAGRAM_ACCESS_TOKEN,
    has_fb_token: !!process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
    ig_id: process.env.INSTAGRAM_BUSINESS_ID,
    page_id: process.env.FACEBOOK_PAGE_ID,
    app_url: process.env.NEXT_PUBLIC_APP_URL,
    token_len: process.env.INSTAGRAM_ACCESS_TOKEN?.length || 0
  })
}
