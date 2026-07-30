import { NextRequest, NextResponse } from "next/server"

const VERIFY_TOKEN = "vater-kai-verify-123" // dein Verify Token
const IG_ID = "17841443634298281" // REISE! Aus deinem Screenshot!

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("hub.verify_token")
  const challenge = req.nextUrl.searchParams.get("hub.challenge")
  if (token === VERIFY_TOKEN) return new NextResponse(challenge, { status: 200 })
  return new NextResponse("Forbidden", { status: 403 })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log("FULL WEBHOOK:", JSON.stringify(body, null, 2))

  if (body.object !== "instagram") return new NextResponse("OK", { status: 200 })

  for (const entry of body.entry) {
    for (const event of entry.messaging) {
      
      // DEIN FILTER - lässt Echos durchfallen
      if (event.message?.is_echo) {
        console.log("ECHO ignoriert")
        continue
      }

      const senderId = event.sender?.id
      const text = event.message?.text
      if (!senderId || !text) continue

      console.log(`Antworte an ${senderId} mit IG ${IG_ID}`)

      await fetch(`https://graph.facebook.com/v25.0/${IG_ID}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: { id: senderId },
          message: { text: `Du hast: ${text} geschrieben 🤖` },
          access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN
        })
      }).then(r => r.json()).then(j => console.log("SEND RESULT:", j))
    }
  }
  return new NextResponse("EVENT_RECEIVED", { status: 200 })
}
