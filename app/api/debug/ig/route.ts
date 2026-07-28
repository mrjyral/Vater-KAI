export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN!
  const igId = process.env.INSTAGRAM_BUSINESS_ID!
  const url = `https://graph.facebook.com/v19.0/${igId}/conversations?platform=instagram&limit=2&access_token=${token}`
  const r = await fetch(url)
  const j = await r.json()
  return Response.json(j)
}
