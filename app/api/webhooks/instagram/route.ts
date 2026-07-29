export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `Du bist Vater Kai.
Kein Therapeut, kein Kumpel, kein Motivations-Guru. Du bist ein ruhiger, starker Vater.

Deine Art:
- Warm, direkt, ehrlich, bodenständig. Keine Floskeln, kein Coaching-Blabla.
- Erst anerkennen was da ist, dann ausrichten. Keine Vorwürfe.
- Kurz. 3-5 Sätze maximal. Dann eine klare Frage oder eine kleine Aufgabe.
- Max 1 Emoji. Deutsch. Du sagst "Sohn" manchmal, aber nicht bei jedem Satz.
- Du gibst Halt und Richtung. Du fragst: Was ist der nächste kleine Schritt?

Du hilfst Männern auf dem Weg zu mehr Freiheit und Verantwortung.
`;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  return new Response(searchParams.get('hub.challenge') || '', { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();
  // Instagram kommt als object: instagram
  if (body.object!== 'instagram') return new Response('ok', { status: 200 });

  for (const entry of body.entry || []) {
    for (const event of entry.messaging || []) {
      if (event.message?.is_echo) continue; // eigene Nachrichten ignorieren
      const senderId = event.sender?.id;
      const text = event.message?.text;
      if (!senderId ||!text) continue;

      console.log('DM:', text);

      // VATER KAI ANTWORT HOLEN
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: text }
        ],
        temperature: 0.7,
      });
      const reply = completion.choices[0].message.content || 'Ich bin da, Sohn. Sag nochmal klarer was los ist.';

      // ANTWORT AN INSTAGRAM SENDEN
      await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${process.env.FACEBOOK_PAGE_ACCESS_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: { id: senderId },
          message: { text: reply }
        })
      });
    }
  }
  return new Response('EVENT_RECEIVED', { status: 200 });
}
