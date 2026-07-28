import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return new Response('Kein code', { status: 400 })
  const redirect_uri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`

  const t1 = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&redirect_uri=${encodeURIComponent(redirect_uri)}&code=${code}`)
  const j1 = await t1.json()
  const shortToken = j1.access_token

  const t2 = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&fb_exchange_token=${shortToken}`)
  const j2 = await t2.json()
  const longUserToken = j2.access_token || shortToken

  const t3 = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${longUserToken}`)
  const j3 = await t3.json()
  const page = j3.data?.[0]
  const pageToken = page?.access_token

  const t4 = await fetch(`https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${longUserToken}`)
  const j4 = await t4.json()
  const igId = j4.instagram_business_account?.id

  return new Response(`
    <html><body style="font-family:sans-serif;padding:20px">
      <h1>✅ FINALER TOKEN</h1>
      <p><b>PAGE ID:</b> ${page.id}</p>
      <p><b>IG BUSINESS ID:</b> ${igId}</p>
      <p><b>PAGE TOKEN (DAS HIER KOPIEREN!):</b></p>
      <textarea style="width:100%;height:200px">${pageToken}</textarea>
      <p>Token Länge: ${pageToken?.length}</p>
      <p><b>In Vercel eintragen:</b><br>
      INSTAGRAM_ACCESS_TOKEN = Page Token<br>
      FACEBOOK_PAGE_ACCESS_TOKEN = Page Token<br>
      INSTAGRAM_BUSINESS_ID = ${igId}<br>
      FACEBOOK_PAGE_ID = ${page.id}</p>
    </body></html>`, { headers: { 'Content-Type': 'text/html' } })
}  const igId = igJson.instagram_business_account?.id

  return new Response(`
    <html><body style="font-family:sans-serif; padding:30px">
      <h1>✅ GEFUNDEN!</h1>
      <p><b>PAGE ID:</b> ${page.id}</p>
      <p><b>INSTAGRAM BUSINESS ID:</b> ${igId}</p>
      <p><b>TOKEN:</b><br><textarea style="width:100%; height:150px">${longToken}</textarea></p>
      <p>Kopier diese 3 Werte in Vercel -> Settings -> Environment Variables</p>
      <ul>
        <li>FACEBOOK_PAGE_ID = ${page.id}</li>
        <li>INSTAGRAM_BUSINESS_ID = ${igId}</li>
        <li>FACEBOOK_PAGE_ACCESS_TOKEN = Token von oben</li>
        <li>INSTAGRAM_ACCESS_TOKEN = gleicher Token</li>
      </ul>
      <p>Danach Redeploy!</p>
    </body></html>
  `, { headers: { 'Content-Type': 'text/html' } })

