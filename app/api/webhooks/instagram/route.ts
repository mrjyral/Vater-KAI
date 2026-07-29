export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  return new Response(searchParams.get('hub.challenge') || '', { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log('FULL WEBHOOK:', JSON.stringify(body));

  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN || process.env.PAGE_ACCESS_TOKEN || '';
  console.log('TOKEN DA?', token ? 'JA ' + token.substring(0,20)+'...' : 'NEIN - ENV VAR FEHLT!');

  if (body.object !== 'instagram' && body.object !== 'page') {
    return new Response('ok', { status: 200 });
  }

  for (const entry of body.entry || []) {
    for (const ev of entry.messaging || []) {
      if (ev.message?.is_echo) continue;
      const senderId = ev.sender?.id;
      const text = ev.message?.text;
      if (!senderId || !text) continue;

      console.log(`Versuche Antwort an ${senderId} für "${text}"`);

      const res = await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: { id: senderId },
          message: { text: `Ich hab dich gehört Sohn: "${text}" - ich bin da.` }
        })
      });
      const data = await res.json();
      console.log('FB SEND RESULT:', JSON.stringify(data));
    }
  }
  return new Response('EVENT_RECEIVED', { status: 200 });
}
