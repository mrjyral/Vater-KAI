export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  return new Response(searchParams.get('hub.challenge') || '', { status: 200 });
}
export async function POST(req: Request) {
  const body = await req.json();
  const messaging = body.entry?.[0]?.messaging?.[0];
  if (messaging?.message?.text) {
    const senderId = messaging.sender.id;
    const text = messaging.message.text;
    console.log('DM von', senderId, ':', text);
    // ANTWORT SENDEN
    await fetch(`https://graph.facebook.com/v19.0/${process.env.FACEBOOK_PAGE_ID}/messages?access_token=${process.env.FACEBOOK_PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: senderId },
        message: { text: `Vater Kai hat dich gehört: "${text}" ❤️` }
      })
    });
  }
  return new Response('EVENT_RECEIVED', { status: 200 });
}
