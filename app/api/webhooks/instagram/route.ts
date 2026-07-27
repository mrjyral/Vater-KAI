import { NextResponse } from 'next/server'

const VERIFY_TOKEN = 'vater-kai-verify-2024'

// Für die Validierung bei Facebook
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK VERIFIED')
    return new Response(challenge, { status: 200 })
  }
  return new Response('Forbidden', { status: 403 })
}

// Für echte Instagram Nachrichten
export async function POST(req: Request) {
  const body = await req.json()
  console.log('INSTAGRAM WEBHOOK:', JSON.stringify(body, null, 2))
  
  // Hier kommt später deine KAI Logik hin
  return NextResponse.json({ ok: true })
}
