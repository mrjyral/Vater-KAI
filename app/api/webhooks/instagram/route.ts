export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const challenge = searchParams.get('hub.challenge');
  // Für den Test erstmal JEDEN Token annehmen!
  if (challenge) {
    return new Response(challenge, { status: 200 });
  }
  return new Response('no challenge', { status: 200 });
}

export async function POST(req: Request) {
  console.log('Webhook POST');
  return new Response('EVENT_RECEIVED', { status: 200 });
}
