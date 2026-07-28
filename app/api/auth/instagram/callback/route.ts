import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'No code' }, { status: 400 })

  const appId = process.env.FACEBOOK_APP_ID!
  const appSecret = process.env.FACEBOOK_APP_SECRET!
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`

  // 1. Code -> Short Token
  const tokenRes = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}`)
  const tokenData = await tokenRes.json()
  if (!tokenData.access_token) return NextResponse.json(tokenData, { status: 400 })

  // 2. Short -> Long Lived
  const longRes = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${tokenData.access_token}`)
  const longData = await longRes.json()
  const userToken = longData.access_token || tokenData.access_token

  // 3. Hole Pages + Page Token
  const pagesRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${userToken}`)
  const pagesData = await pagesRes.json()

  const page = pagesData.data?.[0]
  
  let html = `<h1>GEFUNDEN - KOPIEREN!</h1>
  <p><b>User Token (long):</b><br><textarea style="width:100%;height:100px">${userToken}</textarea></p>
  <p><b>Page Token:</b><br><textarea style="width:100%;height:100px">${page?.access_token || 'kein Page gefunden'}</textarea></p>
  <p><b>Page ID:</b> ${page?.id || ''}</p>
  <p><b>Pages API Antwort:</b><pre>${JSON.stringify(pagesData, null, 2)}</pre></p>
  <hr><a href="/dashboard">Zum Dashboard</a>`

  return new Response(html, { headers: { 'Content-Type': 'text/html' } })
}
