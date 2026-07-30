export async function POST(req: Request) {
  const body = await req.json()
  console.log("FULL WEBHOOK:", JSON.stringify(body, null, 2))

  // 1. Nur Instagram
  if (body.object !== "instagram") return new Response("OK", {status: 200})

  for (const entry of body.entry) {
    for (const msgEvent of entry.messaging) {

      // 2. HIER EINBAUEN!!! Ganz am Anfang der Schleife!
      if (msgEvent.message?.is_echo) {
        console.log("ECHO ignoriert - eigene Nachricht")
        continue
      }

      const senderId = msgEvent.sender.id // 2164... = Andreas
      const igId = entry.id // 17841406331656186 = Reise
      const text = msgEvent.message?.text
      if (!text) continue

      console.log(`Versuche Antwort an ${senderId} für "${text}"`)

      // 3. Antworten
      await fetch(`https://graph.facebook.com/v20.0/${igId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: { id: senderId },
          message: { text: `Du hast geschrieben: ${text} 🚀` },
          access_token: process.env.PAGE_TOKEN
        })
      })
    }
  }
  return new Response("EVENT_RECEIVED", {status: 200})
}
