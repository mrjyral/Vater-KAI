import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.redirect('https://vater-kai-1.vercel.app/dashboard')
}      FACEBOOK_PAGE_ID = ${page.id}</p>
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
