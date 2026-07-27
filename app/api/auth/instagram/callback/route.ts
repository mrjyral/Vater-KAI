import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return new Response('Kein code', { status: 400 })

  const redirect_uri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`
  
  console.log('STEP 1 code:', code)

  // 1. Code -> Short Token
  const tokenRes = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&redirect_uri=${encodeURIComponent(redirect_uri)}&code=${code}`)
  const tokenJson = await tokenRes.json()
  console.log('STEP 2 tokenJson:', tokenJson)
  
  if (!tokenJson.access_token) return new Response(JSON.stringify(tokenJson), { status: 500 })

  // 2. Long Lived Token
  const longRes = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&fb_exchange_token=${tokenJson.access_token}`)
  const longJson = await longRes.json()
  const longToken = longJson.access_token || tokenJson.access_token
  console.log('STEP 3 longToken:', longToken)

  // 3. Pages holen
  const pagesRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${longToken}`)
  const pagesJson = await pagesRes.json()
  console.log('STEP 4 pages:', JSON.stringify(pagesJson))

  const page = pagesJson.data?.[0]
  if (!page) return new Response('Keine Page gefunden: ' + JSON.stringify(pagesJson), { status: 500 })

  // 4. Instagram Business ID holen
  const igRes = await fetch(`https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${longToken}`)
  const igJson = await igRes.json()
  console.log('STEP 5 ig:', JSON.stringify(igJson))

  const igId = igJson.instagram_business_account?.id

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
}
