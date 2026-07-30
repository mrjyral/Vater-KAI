import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = "vater-kai-verify-123";
const IG_ID = "17841443634298281"; // ID von meine.reise.zu.mehr.freiheit

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("hub.mode");
  const token = req.nextUrl.searchParams.get("hub.verify_token");
  const challenge = req.nextUrl.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("FULL WEBHOOK:", JSON.stringify(body, null, 2));

    if (body.object !== "instagram") {
      return new NextResponse("OK", { status: 200 });
    }

    for (const entry of body.entry || []) {
      // FIX für deinen Fehler + standby Support
      const messagingEvents = Array.isArray(entry.messaging) ? entry.messaging : [];
      const standbyEvents = Array.isArray((entry as any).standby) ? (entry as any).standby : [];
      
      const allEvents = [...messagingEvents, ...standbyEvents];

      if (allEvents.length === 0) {
        console.log("Kein messaging/standby in entry:", entry.id);
        continue;
      }

      for (const event of allEvents) {
        // Echo von dir selbst ignorieren
        if (event.message?.is_echo) {
          console.log("ECHO ignoriert");
          continue;
        }

        const senderId = event.sender?.id;
        const text = event.message?.text;

        if (!senderId || !text) {
          console.log("Kein sender/text", event);
          continue;
        }

        console.log(`ECHTE Nachricht von ${senderId}: ${text}`);

        // Antwort senden
        const res = await fetch(`https://graph.facebook.com/v25.0/${IG_ID}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipient: { id: senderId },
            message: { text: `Du hast: ${text} geschrieben 🤖` },
            access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
          }),
        });

        const data = await res.json();
        console.log("SEND RESULT:", JSON.stringify(data));
      }
    }

    return new NextResponse("EVENT_RECEIVED", { status: 200 });
  } catch (e) {
    console.error("WEBHOOK ERROR", e);
    return new NextResponse("OK", { status: 200 });
  }
}
